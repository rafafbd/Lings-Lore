import { ctx } from "../index.js";// passes the canvas context to the platform class

export class Platform {
    constructor(x, y, width, height, /*imgSource*/) {
        //const image = new Image()
        //this.image = image
        //this.image.src = imgSource;
        this.position = {x, y};

        this.proportions = {width, height};
        
    }
    
    draw() {
        ctx.fillRect(this.position.x, this.position.y, this.position.x + this.proportions.width, this.position.y + this.proportions.height)
    }
    update() {
        this.draw()
    }
}