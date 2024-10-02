// inimigo basico, mas ele pula alto

class Fred extends Enemy {
    constructor({x, y}){
        super({x, y}, "./Assets/spriteEnemies/fred.png", 50, 100, 10, 35, 10, 50, 50);
        this.enemiesSizes = {
            spriteWidth: 100,
            spriteHeight: 100,
            scale: 1
        }; 
    }

}
