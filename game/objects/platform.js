import { ctx } from "../index.js";// passes the canvas context to the platform class

export class Platform {
    constructor(x, y, width, height, /*imgSource*/) {
        //const image = new Image()
        //this.image = image
        //this.image.src = imgSource;
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

    draw() {
        ctx.fillRect(this.position.x, this.position.y, this.position.x + this.proportions.width, this.position.y + this.proportions.height)
    }
    update() {
        this.draw()
    }
}