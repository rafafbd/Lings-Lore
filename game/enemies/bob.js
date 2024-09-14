class Bob extends Enemy {
    constructor(x, y){
        super(x, y, "./Assets/Bob-spritesheet.png", 50, 80, 15, 0, 100, 10);
    }

    update(){
        super.draw();
    }
}