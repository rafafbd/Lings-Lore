class Enemy {
    constructor({x, y} /*imgSource,*/) {
         
        //const image = new Image()
        //this.image = image
        //this.image.src = imgSource;

        this.shape = "rec";

        this.width = 50;
        this.height = 80;

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

        let d = new Date();
        this.damageTimer = d.getTime()/1000; // time in seconds
        this.damageCd = 0.5

        this.hp = 100;
        this.dead = false;

    }

    draw() { // draws enemy every frame (called in a loop)
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    takesDamage(damage) {
        let d = new Date();
        let time = d.getTime()/1000;
        if (time - this.damageTimer > this.damageCd){
            this.hp -= damage;
            this.damageTimer = time;
        }
        
        if (this.hp <= 0) {
            this.dead = true;
        }
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

        if (!this.dead) {
            this.draw();
        }
        
    }

}