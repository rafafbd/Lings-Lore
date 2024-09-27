class Stick {
    constructor({x, y, direction}){
        this.position = {
            x: x,
            y: y
        }

        this.speed = {
            x: 10,
            y: 5
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

        this.image = new Image();
        this.image.src = "";

        if (Math.abs(this.direction) == 2) {
            this.width = 16;
            this.height = 64;
        }

    }

        horizontalMovement(){
            this.velocity.x = this.speed.x * this.direction;
        }

        verticalMovement(){
            this.velocity.y = this.speed.y * this.direction;
        }

        draw(){
            ctx.fillStyle = "lightgreen";
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
            ctx.restore();
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
                    ctx.translate(this.position.x, this.position.y);
                    ctx.rotate(Math.PI/2); 
                    ctx.translate(-this.position.x, -this.position.y);
                    this.verticalMovement();
                    break;
                case 2:
                    ctx.save();
                    ctx.translate(this.position.x, this.position.y);
                    ctx.rotate(Math.PI/2); 
                    ctx.translate(-this.position.x, -this.position.y);
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