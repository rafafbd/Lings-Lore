// inimigo basico, mas ele pula alto

class Fred extends Enemy {
    constructor({x, y}){
        super({x, y}, "./Assets/spriteEnemies/fredUSALover.png", 64, 128, 5, 10, 15, 80, 30);
        this.enemiesSizes = {
            spriteWidth: 64,
            spriteHeight: 128,
            scale: 1
        }; 
    }

    update() {
        if (!this.isKnockback && this.position.x > 0 && Math.abs(this.position.x - player.position.x) < 800) {
            let where = this.playerWhere();
            if (where == -1) { // player is at left
                this.velocity.x = -this.speed.x;
            }
            else if (where == 1){ // player is at right
                //ctx.scale(-1, 1); // inverts the context
                ctx.save();
                ctx.translate(this.position.x+this.width, this.position.y);
                ctx.scale(-1, 1); // inverts the context
                ctx.translate(-this.position.x, -this.position.y);
                
                this.velocity.x = this.speed.x;
            }
            else {
                this.velocity.x *= 0.7;
            }
        }
        else {
            this.velocity.x = 0;
        }
        this.jump(); // verifies if need to jump and tries to do so

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.updatePositions();

        if (this.hp <= 0) {
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
        if (this.dead) {
            ctx.restore();
        }

        this.draw();
        ctx.restore();
    }
    
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}