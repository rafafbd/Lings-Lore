
class Jorge extends Enemy {
    constructor({x, y}){
        super({x, y}, "", 64, 128, 5, 13, 2, 101, 15)
        this.throwDelay = 1200;
        this.nextThrowTime = 0;
    }

    throw(direction){

        let note = new Note({
            x: this.position.x,
            y: this.position.y + this.height/2,
            damage: 20,
            width: 100,
            height: 40,
            horizontalBool: true,
            direction: direction
        });
        notes.push(note);
    }

    update(){
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

        console.log(this.position)

        this.draw();
        ctx.restore();
    }

    draw(){
        ctx.fillStyle = "brown";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}