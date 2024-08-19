export class Player {
    constructor(x, y, ctx) {
        this.ctx; // passes the canvas context to the player class

        this.position = { // player's position
            x,
            y
        };
        this.width = 100;
        this.height = 100;

        this.velocity = {
            x: 0, // x axis velocity
            y: 0  // y axis velocity
        };

        this.speed = { // values wich modify the velocity values
            x: 10, // walk speed
            y: 15 // jump speed
        };

        // ^^^^^^ physics ^^^^^^^^
        // vvvvvv states vvvvvvvvv 

        this.looking = {
            right: false,
            left: false,
            up: false,
            down: false
        };

        this.isOnFloor = false;


        this.hp = 100;

    }

    draw() {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    resetLookingDirection() { // sets all the looking directions to false for a new one to be set
        this.looking.forEach(direction => {
            direction = false;
        });
    }

    update(keys, gravity) {

        // basic movements
        if (keys.left.pressed) {
            this.velocity.x = -this.speed.x;
            this.resetLookingDirection();
            this.looking.left = True;
        }
        else if (keys.right.pressed) {
            this.velocity.x = this.speed.x;
            this.resetLookingDirection();
            this.looking.right = True;
        }
        else {
            this.velocity.x = 0;
        }

        // looking inputs
        if (keys.up.pressed) {
            this.resetLookingDirection();
            this.looking.up = True;
        }
        else if (keys.down.pressed) {
            this.resetLookingDirection();
            this.looking.down = True;
        }
        // jump
        if (this.isOnFloor == false){
            this.velocity.y -+ gravity;
        }
        else if (keys.jump.pressed && this.isOnFloor) {
            this.velocity.y = this.speed.y;
        }
        else {
            this.velocity.y = 0;
        }


        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw();
    }
}