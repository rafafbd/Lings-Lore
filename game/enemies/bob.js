class Bob extends Enemy {
    constructor({x, y}, sideToSideRange){
        super({x, y}, "./Assets/spriteEnemies/Bob-spritesheet.png", 50, 80, 5, 0, 20, 100, 15 );
        this.originalPosition = {x, y};
        this.seePlayerRange = 400;
        this.playerInRange = false;
        this.sideToSideRange = sideToSideRange;
        this.patrolDirection = 1; // 1 for right, -1 for left

        this.gettingUp = false;
    }

    update(){
        if (Math.abs(this.position.x - player.position.x) < this.seePlayerRange && Math.abs(this.position.y - player.position.y) < this.seePlayerRange && !this.playerInRange) {
            // play startup animation
            this.gettingUp = true;
            setTimeout(() =>{
                this.playerInRange = true;
            }, 1000);
        }
        else if(!this.gettingUp) {
            this.playerInRange = false;
        }

        if (!this.isKnockback) {
            if (!this.playerInRange) {
                this.velocity.x = 0;
            }
            else if (this.playerInRange) {
                let where = this.playerWhere();
                if (where == -1) { // player is at left
                    this.velocity.x = -this.speed.x;
                }
                else if (where == 1){ // player is at right
                    ctx.save();
                    ctx.translate(this.position.x + this.width*2, this.position.y);
                    ctx.scale(-1, 1); // inverts the context
                    ctx.translate(-this.position.x, -this.position.y);
                    this.velocity.x = this.speed.x;
                }
                else {
                    this.velocity.x *= 0.7;
                }
            }
        }
        this.jump(); // applies gravity

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.updatePositions();

        if (this.hp <= 0 || this.position.y > canvas.height) {
            let howManyCredits = this.creditsValue / 10;
            for (let i = 1; i < howManyCredits; i++) {
                components.credits.push(new Credits({ // creates a new positive credits object to make player lose credits
                    x: this.position.x,
                    y: this.position.y - 20 - (i * 20),
                }, "positive"));
            }
            this.dead = true;
            ctx.restore();
        }

        this.draw();
        ctx.restore();
    }
}