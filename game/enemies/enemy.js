class Enemy {
    constructor({x, y} /*imgSource,*/) {
         
        //const image = new Image()
        //this.image = image
        //this.image.src = imgSource;

        this.width = 10;
        this.height = 30;

        this.position = {x,y};
        this.centerPosition = { // used for detection
            x: this.position.x + (this.width / 2),
            y: this.position.y + (this.height / 2)
        }

        this.velocity = {// velocity in each axis
            x: 0, 
            y: 0  
        };

        this.speed = { // values wich modify the velocity values
            x: 5, // walk speed
            y: 10 // jump speed
        };

        // ^^^^^^ physics ^^^^^^^^
        // vvvvvv states vvvvvvvvv 

        this.isOnFloor = false;
        this.hp = 100;
        this.dead = false;

    }

    draw() { // draws enemy every frame (called in a loop)
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    playerWhere() { // detects wheter the enemy will detect the player 
        if (this.centerPosition.x > player.centerPosition.x ){
           return "playerAtLeft";
        }
        if (player.centerPosition.x > this.centerPosition.x ){
            return "playerAtRight";
        }
        return "dontSeePlayer";
    }

    isPlayerHigher() {
        if (player.centerPosition.y < this.centerPosition.y){
            return true;
        }
        return false;
    }

    jump(gravity) {
        if ((this.position.y + this.height) >= 450){
            this.isOnFloor = true
        }
        else{
            this.isOnFloor = false
        }

        if (!this.isOnFloor){
            this.velocity.y += gravity;
        }
        else if (this.isPlayerHigher() && this.isOnFloor) {
            this.velocity.y = -this.speed.y;
        }
        else {
            this.velocity.y = 0;
        }
    }

    update() {
        let where = this.playerWhere();
        if (this.playerWhere() === "playerAtLeft") {
            this.velocity.x = -this.speed.x;
        }
        else if (this.playerWhere() === "playerAtRight"){
            this.velocity.x = this.speed.x;
        }
        else {
            this.velocity.x = 0;
        }
        this.jump(gravity); // verifies if need to jump and tries to do so

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // updates center position

        this.centerPosition.x = this.position.x + (this.width / 2);
        this.centerPosition.y = this.position.y + (this.height / 2);

        // if (player.looking.down || player.looking.up) {
        //     if (player.fork.attackCoordinates.x2 >= this.position.x &&
        //         player.fork.attackCoordinates.x <= this.position.x 

        //     )
        // }
        // else {
            if (player.fork.attackCoordinates.x2 >= this.position.x &&
                player.fork.attackCoordinates.x <= this.position.x - this.width &&
                player.fork.attackCoordinates.y2 >= this.position.y  &&
                player.fork.attackCoordinates.y <= this.position.y + this.height) {
                this.hp -= player.fork.damage;
                console.log(this.hp)
            }
        // }
        if (this.hp <= 0) {
            this.dead = true
        }
        if (!this.dead) {
            this.draw();
        }
        
    }

}