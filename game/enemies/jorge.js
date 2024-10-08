
class Jorge extends Enemy {
    constructor({x, y}){
        super({x, y}, "", 64, 128, 5, 13, 2, 110, 45)
        this.throwDelay = 2000;
        this.nextThrowTime = 0;
        const jorge = new Image();
        jorge.src = "./Assets/spriteEnemies/jorge.png"
        this.jorge = jorge
    }

    throw(direction){

        let note = new Note({
            x: this.position.x,
            y: this.position.y + this.height/3,
            damage: 20,
            width: 100,
            height: 40,
            horizontalBool: true,
            direction: direction // -1 for left, 1 for right
        });
        notes.push(note);
    }

    update(){
        ctx.save()
        var currentTime = Date.now();
        if (currentTime > this.nextThrowTime && Math.abs(this.position.x - player.position.x) < 900) {
            this.throw(this.playerWhere());
            this.nextThrowTime = currentTime + this.throwDelay;
        }

        
        this.jump();

        this.velocity.x *= 0.8;
        

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
        else {
            this.draw();
        }
        ctx.restore();
    }

    draw(){
        if (this.playerWhere() == 1 ){
            ctx.translate(this.position.x + this.width, this.position.y);
            ctx.scale(-1, 1)
            ctx.translate(-this.position.x, -this.position.y)
        }
        ctx.drawImage(this.jorge, this.position.x, this.position.y); 
    }
}