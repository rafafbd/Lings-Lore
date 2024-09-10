class Platform {
    constructor({x, y, width, height} /*imgSource*/) {
        //const image = new Image()
        //this.image = image
        //this.image.src = imgSource;

        this.velocity = {// velocity in each axis
            x: 0
        };

        this.speed = { // values wich modify the velocity values
            x: 13 // walk speed
        };

        this.sideScrollSpeed = {
            x: 13
        };
        
        this.width = width;
        this.height = height;

        this.position = {x, y};
        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        }
    }
    

    move(direction){ 
        this.velocity.x = this.sideScrollSpeed.x * direction;
        this.position.x += this.velocity.x;
    }

    draw() {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        }
    }
}