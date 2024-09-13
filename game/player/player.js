class Player {
    constructor({x, y, imgSource}) {
         
        // const image = new Image()
        // this.image = image
        // this.image.src = imgSource;

        this.width = 64;
        this.height = 64;

        this.shape = "rectangle";

        this.position = {x,y};
        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        }

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

        // ^^^^^^ positions and velocities^^^^^^^^
        // vvvvvv states vvvvvvvvv 

        this.isOnFloor = false;

        // hp and damage vars
        this.hp = 100;

        let d = new Date()
        this.damageTimer = d.getTime()/1000;
        this.damageCd = 1;

        // -------------------------------------

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

        //--------------------------------------

        // knockback vars
        this.knockbackDirection = "";
        this.knockbackSpeed = 75;
        this.knockbackFriction = 0.7;
        this.isKnockback = false;

        this.attackKnockbackSpeed = 30;

        // social credits *money face emoji*

        this.socialCredits = 0;
    }

    // collision and damage functions

    collided(source){ // source is the object that collided with the player
        if (source instanceof Enemy){
            if (!this.isDashing){
                this.takeDamage(source.damage, source);
            }
        }
        else if (source instanceof Platform){
            // get diff between x/y from the two objects
            let axisDistances = {
                xDiff1: this.position.x - source.position.x, // distance in x axis x1 - x1
                yDiff1: this.position.y - source.position.y, // distance in y axis y1 - y1
                xDiff2: this.position2.x - source.position2.x, // distance in y axis y1 - y2
                yDiff2: this.position2.y - source.position2.y, // distance in y axis y1 - y2
            }

            // inside platform 
            
            if (axisDistances.xDiff1 > 0 && axisDistances.xDiff2 > 0 && axisDistances.yDiff1 < 0 && axisDistances.yDiff2 > 0) { // inside platform -- right of platform
                this.position.x = source.position2.x;
                if (this.velocity.x < 0) {
                    this.velocity.x *= -1;
                }
            }
            else if (axisDistances.xDiff1 < 0 && axisDistances.xDiff2 < 0 && axisDistances.yDiff1 < 0 && axisDistances.yDiff2 > 0){ // inside platform -- left of platform
                this.position.x = source.position.x - this.width;
                if (this.velocity.x > 0) {
                    this.velocity.x *= -1;
                }
            }

            // top or bottom
            if (axisDistances.yDiff1 <= 0 && axisDistances.yDiff2 < 0 && axisDistances.xDiff1 > -this.width && axisDistances.xDiff2 < this.width){ // top of paltform
                this.isOnFloor = true;
                this.position.y = source.position.y - this.height;
            }
            else if (axisDistances.yDiff1 > 0 && axisDistances.yDiff2 >= this.height/2 && axisDistances.xDiff1 > -this.width && axisDistances.xDiff2 < this.width) { // under platform
                this.velocity.y = 0;
                this.position.y = source.position2.y;
            }

            // left or right of platform
            else if (axisDistances.xDiff1 > 0 && axisDistances.xDiff2 > -50 && axisDistances.yDiff1 > 0 && axisDistances.yDiff2 < this.height) { // right of platform
                this.position.x = source.position2.x;
                if (this.velocity.x < 0) {
                    this.velocity.x *= -1;
                }
            }
            else if (axisDistances.xDiff1 < -50 && axisDistances.xDiff2 < 0 && axisDistances.yDiff1 > 0 && axisDistances.yDiff2 < this.height){ // left of platform
                this.position.x = source.position.x - this.width;
                if (this.velocity.x > 0) {
                    this.velocity.x *= -1;
                }
            }
        }
        else if (source instanceof Credits){
            if (!source.isCollected){
                source.isCollected = true;
                if (source.value > 0) {
                    this.gainSocialCredits(source.value);
                }
                else if (source.value < 0) {
                    this.loseSocialCredits(source.value);
                }
            }
        }
    }

    loseSocialCredits(amountLost){
        this.socialCredits -= amountLost; // subtracts the amount lost
        components.credits.push(new Credits({ // creates a new credit object
            x: this.position.x,
            y: this.position.y - 20
        }, "negative"));
        components.credits[components.credits.length - 1].isCollected = true; // makes the credit disappear
    }

    gainSocialCredits(amountGained){
        this.socialCredits += amountGained; // adds the amount gained
    }

    takeDamage(damage, source){
        let d = new Date();
        let time = d.getTime()/1000;

        if (time - this.damageTimer > this.damageCd && this.hp > 0){
            this.hp -= damage;

            this.loseSocialCredits(10);

            this.damageTimer = time;

            // knockback
            if (source instanceof Enemy){
                if (this.centerPosition.x > source.centerPosition.x){
                    this.knockbackDirection = "right";
                }
                else {
                    this.knockbackDirection = "left";
                }
            }
            this.knockBack("enemy");
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

    knockBack(source) {
        this.isKnockback = true;
        if (this.isKnockback) {
            if (source === "fork") { // knockback by fork attack
                if (this.looking.right) {
                    this.velocity.x = -this.attackKnockbackSpeed;
                }
                else if (this.looking.left) {
                    this.velocity.x = this.attackKnockbackSpeed;
                }
                else if (this.looking.down) {
                    this.velocity.y = -this.attackKnockbackSpeed + 15;
                }
                this.isKnockback = false;
                this.attackKnockbackSpeed = 30; // Reset knockback speed
            }

            else if (source === "enemy") { // knockback by enemy attack
                if (this.knockbackDirection === "right") {
                    this.velocity.x = this.knockbackSpeed;
                    this.position.y -= 10; // Adjusts the player's position to make the knockback look more natural
                    this.velocity.y = -this.knockbackSpeed + 60;
                }
                else if (this.knockbackDirection === "left") {
                    this.velocity.x = -this.knockbackSpeed;
                    this.position.y -= 10; // Adjusts the player's position to make the knockback look more natural
                    this.velocity.y = -this.knockbackSpeed + 60;
                }
                this.knockbackSpeed *= this.knockbackFriction;
                this.isKnockback = false;
                this.knockbackSpeed = 75; // Reset knockback speed
            }
        }
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

    heal(amountHealed){
        player.hp += amountHealed;
        if (player.hp > 100){
            player.hp = 100;
        }
    }

    // update function

    draw() { // draws player every frame (called in a loop)
        //ctx.drawImage(this.image, this.position.x, this.position.y)
        ctx.fillStyle = 'gold';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.restore()
    }

    drawLife() {
        ctx.fillStyle = 'black';
        ctx.fillRect(10, 10, 110, 20);
        ctx.fillStyle = 'red';
        ctx.fillRect(15, 15, this.hp, 10)
    }

    update() {
        ctx.save();
        const currentTime = Date.now();

        // basic movements
        if (!this.isDashing && !this.isKnockback) { // locks the player in dash motion or knockback until the dash is over
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

        //  if is on floor then does not fall (incredible)
        if (this.isOnFloor) {
            this.velocity.y = 0;
        }

        // jump
        if (!this.isOnFloor && !this.isDashing) {
            this.velocity.y += gravity;
        }
        else if (keys.jump.pressed && this.isOnFloor) {
            this.velocity.y = -this.speed.y;
            this.isOnFloor = false;
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

        // updates player position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // updates values that are relative to the positions

        this.centerPosition.x = this.position.x + (this.width / 2);
        this.centerPosition.y = this.position.y + (this.height / 2)

        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        }


        this.fork.update();
        this.draw();
        this.drawLife();
    }
}