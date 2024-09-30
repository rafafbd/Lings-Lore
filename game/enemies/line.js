
class Line {
    constructor(y){
        
        this.position = {
            x: 0,
            y: y
        }

        this.width = window.width;
        this.height = 50;

        this.position2 = {
            x: this.x + this.width,
            y: this.y + this.height
        };
    }
}