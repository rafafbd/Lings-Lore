class Note { // throwable used by Jorge
    constructor({x, y, damage, width, height, horizontalBool}){
        this.horizontal = horizontalBool;
        this.position = {
            x: x,
            y: y
        }

        this.speed = {
            x: 15,
            y: 1
        };

        this.velocity = {
            x: 0,
            y: 0
        };

        this.width = width;
        this.height = height;
        this.position2 = {
            x: this.x + this.width,
            y: this.y + this.height
        };
        this.damage = damage;

        this.image = new Image();
        this.image.src = "";
    }

        horizontalMovement(direction){
            this.velocity.x = this.speed.x * direction;
        }

        fall(){
            this.velocity.y += this.speed.y;
        }

        draw(){
            ctx.fillStyle = "lightgreen";
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }

        update = (direction) => {
            if (this.horizontal){
                horizontalMovement(direction);
            }
            else {
                fall();
            }

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            this.position2 = {
                x: this.position.x + this.width,
                y: this.position.y + this.height
            }
        }

    
}