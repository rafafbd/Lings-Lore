class Collision {
    constructor() { // atributes that are to be set by the setObjects method
        this.object1;
        this.object1Values = {};

        this.object2;
        this.object2Values = {};
    }
    setObjects(obj1, {object1X, object1Y, object1Width, object1Height, object1Shape}, obj2, {object2X, object2Y, object2Width, object2Height, object2Shape}) {
        this.object1 = obj1;
        this.object1Values = {object1X, object1Y, object1Width, object1Height, object1Shape};

        this.object2 = obj2;
        this.object2Values = {object2X, object2Y, object2Width, object2Height, object2Shape};
    }
    checkCollision() {
        if (this.object1Shape === 'rectangle' && this.object2Shape === 'rectangle') {
            if (this.object1Values.object1X < this.object2Values.object2X + this.object2Values.object2Width &&
                this.object1Values.object1X + this.object1Values.object1Width > this.object2Values.object2X &&
                this.object1Values.object1Y < this.object2Values.object2Y + this.object2Values.object2Height &&
                this.object1Values.object1Y + this.object1Values.object1Height > this.object2Values.object2Y
            ){
                this.object1.collided(this.object2);
                this.object2.collided(this.object1);
            }
        }
    }
}