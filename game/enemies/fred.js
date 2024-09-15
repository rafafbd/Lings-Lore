// inimigo basico, mas ele pula alto

class Fred extends Enemy {
    constructor({x, y}, sideToSideRange){
        super({x, y}, "./Assets/fred.png", 50, 100, 10, 35, 10, 50, 50);
    }
}
