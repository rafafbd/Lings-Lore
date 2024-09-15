class Heal { // classe de um objeto que o ling se cura quando passar por cima
    constructor(x, y){
        this.position = {
            x: x,
            y: y
        };

        this.width = 20;
        this.height = 20;

        this.image = new Image();
        this.image.src = ""
    }

    draw(){
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}