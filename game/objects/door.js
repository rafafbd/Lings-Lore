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

        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        };
    }

    passLevel(lv){
        if (menus.currentLevel == lv){
            menus.currentLevel += 1;
            menus.passedLevel = true;
        }
    }

    update() {
        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        };
        this.draw();    
    }

    draw(){
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        //ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}