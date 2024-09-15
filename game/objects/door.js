class Door {
    constructor({x, y}){
        this.position = {
            x: x,
            y: y
        };
        this.image = new Image();
        this.image.src = "./Assets/door.png";
        this.height = 64;
        this.width = 64;
    }

    draw(){
        ctx.drawImage(this.image, x, y, this.width, this.height);
    }
}