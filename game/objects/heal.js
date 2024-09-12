class Heal { // classe de um objeto que o ling se cura quando passar por cima
    constructor(x, y){
        this.position = {
            x: x,
            y: y
        };
    }

    passed() {

    }

    update(){
        if (this.passed()){
            player.heal(25);
        }
    }
}