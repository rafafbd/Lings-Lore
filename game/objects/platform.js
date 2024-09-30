class Platform {
    constructor({x, y, width, height}) {
        const image = new Image()
        image.src = "./Assets/spriteFloor/pixil-frame-0(1).png";
        this.image = image
        
        this.isImageLoaded = false
        this.image.onload = () => {
            this.isImageLoaded = true
        }
 
        this.velocity = {// velocity in each axis
            x: 0
        };

        this.speed = { // values wich modify the velocity values
            x: 10 // walk speed
        };
        
        this.width = width;
        this.height = height;

        this.position = {
            x: x,
            y: y
        };

        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        }

    }
    
    move(direction){ // player movement trick
        if (direction === "r"){
            this.velocity.x = this.speed.x;
        }
        else {
            this.velocity.x = -this.speed.y;
        }
        this.position.x += this.velocity.x;
    }

    draw() {
        if (this.isImageLoaded){ 
            const pattern = ctx.createPattern(this.image, "repeat")
            ctx.fillStyle = pattern
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }

    updatePlayerPositions(x, y){
        this.position.x = x
        this.position.y = y
    }

    update() {
        this.draw() 
        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        }
        
    }
}