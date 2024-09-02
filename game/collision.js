class Collision {
    constructor() { // atributes that are to be set by the setObjects method
        this.object1;
        this.object1Values = {};

        this.object2;
        this.object2Values = {};

        this.platformSide = '';
    }
    setObjects(obj1, {object1X, object1Y, object1Width, object1Height, object1Shape}, obj2, {object2X, object2Y, object2Width, object2Height, object2Shape}) {
        this.object1 = obj1;
        this.object1Values = {object1X, object1Y, object1Width, object1Height, object1Shape};

        this.object2 = obj2;
        this.object2Values = {object2X, object2Y, object2Width, object2Height, object2Shape};
    }
    checkCollision() {
        if (this.object1Values.object1Shape === 'rectangle' && this.object2Values.object2Shape === 'rectangle') { // two rectangles
            if (this.object1Values.object1X < this.object2Values.object2X + this.object2Values.object2Width &&
                this.object1Values.object1X + this.object1Values.object1Width > this.object2Values.object2X &&
                this.object1Values.object1Y < this.object2Values.object2Y + this.object2Values.object2Height &&
                this.object1Values.object1Y + this.object1Values.object1Height > this.object2Values.object2Y
            ){
                // checks if collisin is on top or sides of the platform
                if (this.object2 instanceof Platform) { 

                    if (this.object1Values.object1X < this.object2Values.object2X + this.object2Values.object2Width &&
                        this.object1Values.object1X + this.object1Values.object1Width > this.object2Values.object2X) {

                        if (this.object1Values.object1Y + this.object1Values.object1Height > this.object2Values.object2Y &&
                            this.object1Values.object1Y < this.object2Values.object2Y) {
                            this.platformSide = 'top';

                        } else if (this.object1Values.object1Y < this.object2Values.object2Y + this.object2Values.object2Height &&
                                   this.object1Values.object1Y + this.object1Values.object1Height > this.object2Values.object2Y + this.object2Values.object2Height) {
                            this.platformSide = 'bottom';
                        }
                    }
                    if (this.object1Values.object1Y < this.object2Values.object2Y + this.object2Values.object2Height &&
                        this.object1Values.object1Y + this.object1Values.object1Height > this.object2Values.object2Y) {

                        if ((this.object1Values.object1X + this.object1Values.object1Width > this.object2Values.object2X &&
                         this.object1Values.object1X < this.object2Values.object2X) ||
                        (this.object1Values.object1X < this.object2Values.object2X + this.object2Values.object2Width &&
                         this.object1Values.object1X + this.object1Values.object1Width > this.object2Values.object2X + this.object2Values.object2Width)) {
                            this.platformSide = 'side';
                        }
                        
                    }
                }

                this.object1.collided(this.object2, this.platformSide);
                this.object2.collided(this.object1);
            }
        }
        else if (this.object1Values.object1Shape === 'circle' && this.object2Values.object2Shape === 'circle') { // two circles
            let dx = this.object1Values.object1X - this.object2Values.object2X;
            let dy = this.object1Values.object1Y - this.object2Values.object2Y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.object1Values.object1Width / 2 + this.object2Values.object2Width / 2) {
                this.object1.collided(this.object2);
                this.object2.collided(this.object1);
            }
        }

    }
}