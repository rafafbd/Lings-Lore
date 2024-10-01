class Stick {
    constructor({x, y, direction}){
        const image = new Image();
        this.image = image;
        this.image.src = "./Assets/spriteChopstick/chopstick-sprite.png";
        this.canPlay = false;
        this.image.onload = () => {
            this.canPlay = true;
        }

        this.position = {
            x: x,
            y: y
        }

        this.speed = {
            x: 20,
            y: 10 // should be half of x speed
        };

        this.velocity = {
            x: 0,
            y: 0
        };

        this.width = 64;
        this.height = 16;
        this.position2 = {
            x: this.x + this.width,
            y: this.y + this.height
        };
        this.damage = 30;
        this.direction = direction; // -1 for left, 1 for right, -2 for up, 2 for down

        if (Math.abs(this.direction) == 2) {
            this.width = 16;
            this.height = 64;
            
        }

        this.isDestroyed = false;
    }

        collided(source) {
            if (source instanceof Enemy) {
                this.isDestroyed = true;
            }
        }

        horizontalMovement(){
            this.velocity.x = this.speed.x * this.direction;
        }

        verticalMovement(){
            this.velocity.y = this.speed.y * this.direction;
        }

        draw(){
            if (!this.canPlay) {
                return;
            }
            ctx.drawImage(this.image, this.position.x, this.position.y);
            ctx.restore();
        }
        rotate() {
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(Math.PI/2); 
            ctx.translate(-this.position.x, -this.position.y);
          }

        update() {
            switch (this.direction) {
                case -1:
                    this.horizontalMovement();
                    break;
                case 1:
                    this.horizontalMovement();
                    break;
                case -2:
                    ctx.save();
                    // this.rotate(); // only use if there is a sprite for the stick
                    this.verticalMovement();
                    break;
                case 2:
                    ctx.save();
                    // this.rotate(); // only use if there is a sprite for the stick
                    this.verticalMovement();
                    break;
            }

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            this.position2 = {
                x: this.position.x + this.width,
                y: this.position.y + this.height
            }
            this.draw();
        }
        

    
}