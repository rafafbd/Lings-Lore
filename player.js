import { ctx } from "./index.js";// passes the canvas context to the player class

export class Player {
    constructor(x, y) {
         

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
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    resetLookingDirection() {
        this.looking.right = false;
        this.looking.left = false;
        this.looking.up = false;
        this.looking.down = false;
    }

    update(keys, gravity) {

        // basic movements
        if (keys.left.pressed) {
            this.velocity.x = -this.speed.x;
            this.resetLookingDirection();
            this.looking.left = true;
        }
        else if (keys.right.pressed) {
            this.velocity.x = this.speed.x;
            this.resetLookingDirection();
            this.looking.right = true;
        }
        else {
            this.velocity.x = 0;
        }

        // looking inputs
        if (keys.up.pressed) {
            this.resetLookingDirection();
            this.looking.up = true;
        }
        else if (keys.down.pressed) {
            this.resetLookingDirection();
            this.looking.down = true;
        }
        // jump
        if (this.position.y >= 450){
            this.isOnFloor = true
        }
        else{
            this.isOnFloor = false
        }

        if (this.isOnFloor == false){
            this.velocity.y += gravity;
        }
        else if (keys.jump.pressed && this.isOnFloor) {
            this.velocity.y = -this.speed.y;
        }
        else {
            this.velocity.y = 0;
        }


        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw();
    }
}