class Player {
    constructor({x, y, imgSource}) {
         
        // const image = new Image()
        // this.image = image
        // this.image.src = imgSource;

        this.width = 64;
        this.height = 64;

        this.shape = "rectangle";

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
            x: 13, // walk speed
            y: 17, // jump speed
        };

        this.looking = {
            right: false,
            left: false,
            up: false,
            down: false
        };

        // ^^^^^^ physics ^^^^^^^^
        // vvvvvv states vvvvvvvvv 

        this.isEndOfScreen = {
            right: false,
            left: false
        };

        this.isOnFloor = false;
        this.floorY = 0;

        this.hp = 100;

        let d = new Date()
        this.damageTimer = d.getTime()/1000;
        this.damageCd = 1;

        // equipment
        this.currentWeapon = "fork";
        this.fork = new Fork({
            x: this.position.x,
            y: this.position.y
        });

        // dash vars
        this.setDashSpeed = 13;
        this.dashSpeed = this.setDashSpeed;
        this.dashFriction = 0.7;
        this.isDashing = false;
        this.dashCooldown = 600; // Cooldown period in milliseconds
        this.nextDashTime = 0; // Time when the player can dash again
    }

    isTopOfPlatform(leftPoint, rightPoint){
        if (this.position.y + this.height > leftPoint[1]+10 || 
            this.position.y + this.height < leftPoint[1]-10){  // the [1] refers to y
            return false;
        }
        if (this.position.x + this.width >= leftPoint[0] &&     // the [0] refers to x
            this.position.x <= rightPoint[0]){
                this.floorY = leftPoint[1];
                return true;
        } 
        return false;
    }

    setIsOnFloor(){
        let onFloor = false;
        for (let i = 0; i<platforms.length; i++){
            onFloor = this.isTopOfPlatform(platforms[i].colisions.top.left, platforms[i].colisions.top.right);
            if (onFloor === true){
                break;
            }
        }
        this.isOnFloor = onFloor;
    }

    fixPositionOnFloor(){
        if (this.isOnFloor && this.position.y + this.height !== this.floorY){
            this.position.y = this.floorY - this.height;
        }
    }

    // collision and damage functions

    collided(source) {
        if (source instanceof Enemy){
            this.takeDamage(source.damage);
        }
    }

    takeDamage(damage){
        let d = new Date();
        let time = d.getTime()/1000;

        if (time - this.damageTimer > this.damageCd && this.hp > 0){
            this.hp -= damage;
            this.damageTimer = time;
        }
        if (this.hp <= 0){
            // gameOver(); // set to dead state and end game through index.js?
            console.log("game over");   
        }
    }

    // movement functions

    resetLookingDirection() {
        this.looking.right = false;
        this.looking.left = false;
        this.looking.up = false;
        this.looking.down = false;
    }

    dash() { // dash mechanic
        if (this.isDashing) {
            if (this.looking.left) {
                this.velocity.x -= this.dashSpeed;
            }
            else if (this.looking.right) {
                this.velocity.x += this.dashSpeed;
            }
            this.dashSpeed *= this.dashFriction;
            if (this.dashSpeed < 1) {
                this.isDashing = false;
                this.dashSpeed = this.setDashSpeed; // Reset dash speed
            }
        }
    }

    move(direction){
        this.resetLookingDirection();
        switch (direction){
            case "r":
                this.looking.right = true;
                if (this.position.x < 1100){
                    this.velocity.x = this.speed.x;
                }
                else {
                    this.isEndOfScreen.right = true;
                }
            case "l":
                this.looking.left = true;
                if (this.position.x > 200){
                    this.velocity.x = -this.speed.x;
                }
                else {
                    this.isEndOfScreen.left = false;
                }
        }
    }

    // update function

    draw() { // draws player every frame (called in a loop)
        //ctx.drawImage(this.image, this.position.x, this.position.y)
        ctx.fillStyle = 'gold';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        const currentTime = Date.now();

        // basic movements
        if (!this.isDashing) { // locks the player in dash motion until the dash is over
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
                this.velocity.x *= 0.8;
            }
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
        this.setIsOnFloor();
        if (!this.isOnFloor && !this.isDashing) {
            this.velocity.y += gravity;
        }
        else if (keys.jump.pressed && this.isOnFloor) {
            this.velocity.y = -this.speed.y;
        }
        else {
            this.velocity.y = 0;
        }
        
        // dash
        if (keys.dash.pressed && !this.isDashing && currentTime > this.nextDashTime) {
            this.isDashing = true;
            this.nextDashTime = currentTime + this.dashCooldown;
        }
        this.dash();

        this.fixPositionOnFloor();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // updates center position

        this.centerPosition.x = this.position.x + (this.width / 2);
        this.centerPosition.y = this.position.y + (this.height / 2)

        this.fork.update();
        this.draw();
    }
}