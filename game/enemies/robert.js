class Robert extends Enemy {
    constructor({x, y}) {
        super({x, y}, "./Assets/spriteEnemies/robert-sprite.png", 64, 64, 3, 3, 15, 70, 15);
        this.seePlayerRange = 800;
        this.playerInRange = false;
        this.enemiesSizes = {
            spriteWidth: 64,
            spriteHeight: 64,
            scale: 1
        }
        this.isMovingHorizontally = false;
        this.isMovingVertically = false;
    }

    increaseIndexX(){ // increases the index of the sprite sheet
        return
    }
    
    collided(source) {
        if (source instanceof Fork) {
            this.takeDamage(source.damage);
            this.knockBack(source);
        }
        else if (source instanceof Stick) {
            this.takeDamage(source.damage);
            this.knockBack(source);
        }
        // no platform collision
    }

    update() {
        ctx.save();
        this.isMovingHorizontally = false;
        this.isMovingVertically = false;
        if (Math.abs(this.position.x - player.position.x) < this.seePlayerRange && Math.abs(this.position.y - player.position.y) < this.seePlayerRange && !this.playerInRange) {
            this.playerInRange = true;
        }
        else {
            this.playerInRange = false;
        }

        if (!this.isKnockback) {
            if (!this.playerInRange) {
                this.velocity.x = 0;
                this.velocity.y = 0;
            }
            else if (this.playerInRange) {
                var where = this.playerWhere();
                if (where == -1) { // player is at left
                    this.isMovingHorizontally = true;
                    this.velocity.x = -this.speed.x;
                }
                else if (where == 1){ // player is at right
                    this.isMovingHorizontally = true;
                    this.velocity.x = this.speed.x;
                }
                else {
                    this.velocity.x *= 0.7;
                }
                if (this.isPlayerHigher()) {
                    this.velocity.y = -this.speed.y;
                    this.isMovingVertically = true;
                }
                else if (this.position.y < player.position2.y && this.position2.y > player.position.y) {
                    this.velocity.y = 0;
                }
                else {
                    this.velocity.y = this.speed.y;
                    this.isMovingVertically = true;
                }

                if (this.isMovingHorizontally && this.isMovingVertically) { // compensates the speed when moving diagonally
                    this.velocity.x *= 0.7;
                    this.velocity.y *= 0.7;
                }
            }
        }

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
        if (this.dead) {
            ctx.restore();
        }
        this.draw();
        ctx.restore();
    }
}
