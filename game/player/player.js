class Player {
    constructor({x, y, imgSource}) {
         
        // const image = new Image()
        // this.image = image
        // this.image.src = imgSource;

        this.width = 64;
        this.height = 64;

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
            x: 10, // walk speed
            y: 15, // jump speed
            dash: 60
        };

        // ^^^^^^ physics ^^^^^^^^
        // vvvvvv states vvvvvvvvv 

        this.isEndOfScreen = {
            right: false,
            left: false
        };

        this.looking = {
            right: false,
            left: false,
            up: false,
            down: false
        };

        this.isOnFloor = false;
        this.floorY = 0;
        this.hp = 100;
        this.dashed = false;
        let d = new Date()
        this.dashTimer = d.getTime()/1000; // time in seconds

        // equipment
        this.currentWeapon = "Fork";
        this.Fork = new Fork({
            x: this.position.x,
            y: this.position.y
        });
    }

    draw() { // draws player every frame (called in a loop)
        //ctx.drawImage(this.image, this.position.x, this.position.y)
        ctx.fillStyle = 'gold';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    resetLookingDirection() {
        this.looking.right = false;
        this.looking.left = false;
        this.looking.up = false;
        this.looking.down = false;
    }

    dash(direction){
        let d = new Date();
        let time = d.getTime()/1000;
        if (time - this.dashTimer > 0.5){
            this.velocity.x = this.speed.dash * direction;
            this.dashTimer = time;
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

    setIsOnFloor(platforms){
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


    update(platforms) {
        console.log(this.isOnFloor);
        // basic movements
        if (keys.left.pressed) {
            this.velocity.x = -this.speed.x;
            this.resetLookingDirection();
            this.looking.left = true;
            //move("l");
        }
        else if (keys.right.pressed) {
            this.velocity.x = this.speed.x;
            this.resetLookingDirection();
            this.looking.right = true;
            //move("r");
        }
        else {
            this.velocity.x *= 0.8;
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
        this.setIsOnFloor(platforms);
        if (!this.isOnFloor){
            this.velocity.y += gravity;
        }
        else if (keys.jump.pressed) {
            this.velocity.y = -this.speed.y;
        }
        else {
            this.velocity.y = 0;
        }
        

        // dash
        if (keys.dash.pressed && this.dashed === false){
            if (this.looking.right){
                this.dash(1);
                this.dashed = true;
            }
            if (this.looking.left){
                this.dash(-1);
                this.dashed = true;
            }
        }
        if (this.isOnFloor){
            this.dashed = false;
        }
        this.fixPositionOnFloor();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        // updates center position

        this.centerPosition.x = this.position.x + (this.width / 2);
        this.centerPosition.y = this.position.y + (this.height / 2)

        this.Fork.update();
        this.draw();
    }
}