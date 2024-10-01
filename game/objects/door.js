class Door {
    constructor({x, y, currentLevel}){
        this.position = {
            x: x,
            y: y
        };
        this.image = new Image();
        if(currentLevel == 1){
            this.image.src = "./Assets/spriteDoors/Level2Door.png";
        }
        else if(currentLevel == 2){
            this.image.src = "./Assets/spriteDoors/Level3Door.png";
        }
        else if(currentLevel == 3){
            this.image.src = "./Assets/spriteDoors/FinalLevelDoor.png";
        }
        
        this.enemiesKilled = false
        this.canDraw = false
        this.image.onload = () => {
            this.canDraw = true
        }
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

    createDoor(){
        this.enemiesKilled = true
    }

    update() {
        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        };
        if (this.canDraw && this.enemiesKilled){
            this.draw()
        };    
    }

    draw(){
        ctx.fillStyle = "yellow";
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        ctx.drawImage(this.image, this.position.x, this.position.y);


        
        
    }
}