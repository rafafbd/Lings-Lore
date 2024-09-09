class Floor extends Platform { // confia
    constructor({xStart, y}){
        this.position.x = xStart;
        this.position.y = y;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height - y;
    }
}