class Heal { // classe de um objeto que o ling se cura quando passar por cima
    constructor(x, y){
        this.position = {
            x: x,
            y: y
        };

        this.width = 20;
        this.height = 20;

        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        };

        this.image = new Image();
        this.image.src = "";

        this.isCollected = false;
    }

    collided(source) {
        if (source instanceof Player) {
            this.isCollected = true;
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
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}