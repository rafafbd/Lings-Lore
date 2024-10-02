
class Line {
    constructor(y){
        this.position = {
            x: 0,
            y: y
        }

        this.damage = 99;
        this.width = 5000;
        this.height = 50;

        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        };
    }
}