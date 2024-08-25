class Platform {
    constructor({x, y, width, height} /*imgSource*/) {
        //const image = new Image()
        //this.image = image
        //this.image.src = imgSource;

        this.velocity = {// velocity in each axis
            x: 0
        };

        this.speed = { // values wich modify the velocity values
            x: 10 // walk speed
        };

        this.position = {x, y};

        this.proportions = {width, height};
        
    }
    
    collisionShape(){ // returns the points of each side of the reactangle for collision detection
        let colisions = {
            left: {
                top: [this.position.x, this.position.y], // top point of the left side
                bottom: [this.position.x, this.position.y + this.proportions.height] // bottom point
            },
            right: {
                top: [this.position.x + this.proportions.width, this.position.y],
                bottom: [this.position.x + this.proportions.width, this.position.y + this.proportions.height]
            },
            top: {
                left: [this.position.x, this.position.y], // leftmost point of the top side
                right: [this.position.x + this.proportions.width, this.position.y] // rightmost point
            },
            bottom: {
                left: [this.position.x, this.position.y + this.proportions.height],
                right: [this.position.x + this.proportions.width, this.position.y + this.proportions.height]
            }
        }
        return colisions;
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
        ctx.fillRect(this.position.x, this.position.y, this.position.x + this.proportions.width, this.position.y + this.proportions.height)
    }
    update() {
        this.draw()
    }
}