class Enemy {
    constructor({x, y}) {
         
        
        const image = new Image()
        this.imgSource = "./Assets/Bob-spritesheet.png";
        image.src = this.imgSource;
        this.image = image
        this.indexX = 0
        this.indexY = 0

        this.enemiesSizes = {
            spriteWidth: 100,
            spriteHeight: 100,
            scale: 1
        }

        this.shape = "rectangle";

        this.width = 50;
        this.height = 80;

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
            x: 5, // walk speed
            y: 10 // jump speed
        };

        // ^^^^^^ physics ^^^^^^^^
        // vvvvvv states vvvvvvvvv 

        this.isOnFloor = false;

        let d = new Date();
        this.damageTimer = d.getTime()/1000; // time in seconds
        this.damageCd = 0.5

        // atributes
        this.damage = 20;
        this.hp = 100;
        this.dead = false;

        // knockback atributes
        this.knockbackDirection = "";
        this.knockbackSpeed = 25;
        this.isKnockback = false;

        this.creditsValue = 15;
    }
    
    increaseIndexX(){ // increases the index of the sprite sheet
        if (this.indexX < 16)
            this.indexX += 1
        else
            this.indexX = 3
    }

    takeDamage(damage) {
        let d = new Date();
        let time = d.getTime()/1000;
        if (time - this.damageTimer > this.damageCd){
            this.hp -= damage;
            this.damageTimer = time;
        }
    }

    playerWhere() { // detects wheter the enemy will detect the player 
        if (this.centerPosition.x > player.centerPosition.x ){
            return "playerAtLeft";
           
        }
        if (player.centerPosition.x > this.centerPosition.x ){
            //ctx.scale(-1, 1); // inverts the context
            ctx.save();
            ctx.translate(this.position.x+this.width*2, this.position.y);
            ctx.scale(-1, 1); // inverts the context
            ctx.translate(-this.position.x, -this.position.y);
            
            return "playerAtRight";
        }
        return "dontSeePlayer";
    }

    isPlayerHigher() {
        if (player.position2.y < this.position.y){
            return true;
        }
        return false;
    }

    jump() {
        if (!this.isOnFloor){
            this.velocity.y += gravity;
        }
        else {
            this.velocity.y = 0;
        }
    }

    knockBack(source) {
        this.isKnockback = true;
        if (this.isKnockback) {
            if (source instanceof Fork) { // knockback by fork attack
                if (player.looking.right) {
                    this.velocity.x = this.knockbackSpeed;
                }
                else if (player.looking.left) {
                    this.velocity.x = -this.knockbackSpeed;
                }
                else if (player.looking.up) {
                    this.velocity.y = -this.knockbackSpeed + 15;
                }
                setTimeout(() => {
                    this.isKnockback = false;
                }, 100);
            }
        }
    }

    collided(source) {
        if (source instanceof Fork) {
            this.takeDamage(source.damage);
            this.knockBack(source);
        }
        else if (source instanceof Platform) {
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
            else if (axisDistances.xDiff1 < 0 && axisDistances.xDiff2 < 0 && axisDistances.yDiff1 < 0 && axisDistances.yDiff2 > 0){ // left of platform
                this.position.x = source.position.x - this.width;
                if (this.velocity.x > 0) {
                    this.velocity.x *= -1;
                }
            }

            // left or right of platform
            else if (axisDistances.xDiff1 > 0 && axisDistances.xDiff2 > -50 && axisDistances.yDiff1 > 0 && axisDistances.yDiff2 < 0) { // right of platform
                this.position.x = source.position2.x;
                if (this.velocity.x < 0) {
                    this.velocity.x *= -1;
                }
            }
            else if (axisDistances.xDiff1 < 0 && axisDistances.xDiff2 < -50 && axisDistances.yDiff1 > 0 && axisDistances.yDiff2 < 0){ // left of platform
                this.position.x = source.position.x - this.width;
                if (this.velocity.x > 0) {
                    this.velocity.x *= -1;
                }
            }

            // top or bottom
            else if (axisDistances.yDiff1 <= 0 && axisDistances.yDiff2 < 0){ // top of paltform
                this.isOnFloor = true;
                this.position.y = source.position.y - this.height;
            }
            else if (axisDistances.yDiff1 >= 0 && axisDistances.yDiff2 > 0) { // under platform
                this.velocity.y = 0;
                this.position.y = source.position2.y;
            }
        }
    }

    update() {
        if (!this.isKnockback) {
            let where = this.playerWhere();
            if (where === "playerAtLeft") {
                this.velocity.x = -this.speed.x;
            }
            else if (where === "playerAtRight"){
                this.velocity.x = this.speed.x;
            }
            else {
                this.velocity.x *= 0.7;
            }
        }
        this.jump(); // verifies if need to jump and tries to do so

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // updates positions

        this.centerPosition.x = this.position.x + (this.width / 2);
        this.centerPosition.y = this.position.y + (this.height / 2);

        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        }

        if (this.hp <= 0) {
            components.credits.push(new Credits({ // creates a new positive credits object to make player lose credits
                x: this.position.x,
                y: this.position.y - 20
            }, "positive"));
            this.dead = true;
            ctx.restore();
        }

        this.draw();
        ctx.restore();
    }

    draw() {
        ctx.drawImage(this.image,
                      this.indexX*this.enemiesSizes.spriteWidth, this.indexY*this.enemiesSizes.spriteHeight,
                      this.enemiesSizes.spriteWidth, this.enemiesSizes.spriteHeight,
                      this.position.x, this.position.y,
                      this.enemiesSizes.scale*this.enemiesSizes.spriteWidth, this.enemiesSizes.scale*this.enemiesSizes.spriteWidth)
        ctx.restore();
        this.increaseIndexX();
    }

}