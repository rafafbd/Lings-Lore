import { ctx } from "./index.js";// passes the canvas context to the player class
import player from "./index.js";

export class Enemy {
    constructor(x, y, /*imgSource,*/) {
         
        //const image = new Image()
        //this.image = image
        //this.image.src = imgSource;
        this.position = {x,y};
        this.width = 100;
        this.height = 100;

        this.velocity = {// velocity in each axis
            x: 0, 
            y: 0  
        };

        this.speed = { // values wich modify the velocity values
            x: 5, // walk speed
            y: 50 // jump speed
        };

        // ^^^^^^ physics ^^^^^^^^
        // vvvvvv states vvvvvvvvv 

        this.isOnFloor = false;
        this.hp = 100;
    }

    draw() { // draws enemy every frame (called in a loop)
        ctx.fillRect(this.position.x, this.position.y, 10, 30)
    }

    playerWhere() { // detects wheter the enemy will detect the player
        if (this.position.x < player.position.x ){
           return "playerAtLeft";
        }
        if (player.position.x > this.position.x ){
            return "playerAtRight";
        }
        return "dontSeePlayer";
    }

    isPlayerHigher() {
        if (player.position.y > this.position.y){
            return true;
        }
        return false;
    }

    jump(gravity) {
        if (this.position.y >= 450){
            this.isOnFloor = true
        }
        else{
            this.isOnFloor = false
        }

        if (this.isOnFloor == false){
            this.velocity.y += gravity;
        }
        else if (this.isPlayerHigher() && this.isOnFloor) {
            this.velocity.y = -this.speed.y;
        }
        else {
            this.velocity.y = 0;
        }
    }

    update(gravity) {

        if (this.playerWhere() === "playerAtLeft") {
            this.velocity.x = -this.speed.x;
        }
        else if (this.playerWhere() === "playerAtRight"){
            this.velocity.x = this.speed.x;
        }
        this.jump(gravity); // verifies if need to jump and tries to do so

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw();
    }

}