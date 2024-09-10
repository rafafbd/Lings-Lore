class Player {
    constructor({x, y, imgSource}) {
         
        // const image = new Image()
        // this.image = image
        // this.image.src = imgSource;

        this.howMuchWasWalkedBeyondTheScreen = 0;
        /* 
        Entao, aqui... o problema eh que quando o player anda demais para os lados, a deteccao de onde ele esta em relacao a tela eh errada,
        porque a "colisao" esta sendo feita de acordo com o canvas, e nao com a posicao relativa da janela.
        Entao uma das solucoes seria conseguir pegar a posicao absoluta em relacao a janela e outra seria usar o quanto foi andado alem da "tela original",
        mas essa ultima opcao eh meio pa
        */

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

        // knockback vars
        this.knockbackDirection = "";
        this.knockbackSpeed = 75;
        this.knockbackFriction = 0.7;
        this.isKnockback = false;

        this.attackKnockbackSpeed = 30;
    }

    // collision and damage functions

    collided(source, platformSide){ // source is the object that collided with the player
        if (source instanceof Enemy){
            this.takeDamage(source.damage, source);
        }
        else if (source instanceof Platform){
            if (platformSide === 'top'){
                this.velocity.y = 0;
                this.isOnFloor = true;
                if (source.position.y + source.proportions.height < this.position.y + this.height){
                    this.position.y = source.position.y - this.height;
                }
            }
            else if (platformSide === 'bottom'){
                this.position.y = source.position.y + source.proportions.height;
                this.velocity.y = 0;
            }
            else if (platformSide === 'side'){
                this.velocity.x = 0;
            }
        }
    }

    takeDamage(damage, source){
        let d = new Date();
        let time = d.getTime()/1000;

        if (time - this.damageTimer > this.damageCd && this.hp > 0){
            this.hp -= damage;
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
                if (this.knockbackDirection === "right") {
                    this.velocity.x += this.attackKnockbackSpeed;
                }
                else if (this.knockbackDirection === "left") {
                    this.velocity.x -= this.attackKnockbackSpeed;
                }
                this.attackKnockbackSpeed *= this.knockbackFriction;
                this.isKnockback = false;
                this.attackKnockbackSpeed = 30; // Reset knockback speed
            }

            else if (source === "enemy") { // knockback by enemy attack
                if (this.knockbackDirection === "right") {
                    this.velocity.x += this.knockbackSpeed;
                    this.position.y -= 10; // Adjusts the player's position to make the knockback look more natural
                    this.velocity.y -= this.knockbackSpeed - 60;
                }
                else if (this.knockbackDirection === "left") {
                    this.velocity.x -= this.knockbackSpeed;
                    this.position.y -= 10; // Adjusts the player's position to make the knockback look more natural
                    this.velocity.y -= this.knockbackSpeed - 60;
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

    setIsEndOfScreen(){
        if (this.position.x > ctx.canvas.width * 0.7){
            this.isEndOfScreen.right = true;
        }
        else if (this.position.x < ctx.canvas.width * 0.3){
            this.isEndOfScreen.left = true
        }
        else {
            this.isEndOfScreen.right = false;
            this.isEndOfScreen.left = false;
        }
    }

    move(direction){
        console.log(this.position.x > ctx.canvas.width * 0.8 || this.position.x < ctx.canvas.width * 0.2)
        //console.log(this.position.x, ctx.canvas.width) // esta dando false
        this.setIsEndOfScreen();
        this.resetLookingDirection();
        switch (direction){
            case "r":
                this.looking.right = true;
                if (this.isEndOfScreen.right){
                    this.scenaryMoves(-1);
                }
                else {
                    this.playerMoves(1);
                }
                break;

            case "l":
                this.looking.left = true;
                if (this.isEndOfScreen.left){
                    this.scenaryMoves(1);
                }
                else {
                    this.playerMoves(-1);
                }
        }
    }

    playerMoves(direction){
        this.velocity.x = this.speed.x * direction;
    }

    scenaryMoves(direction){
        for (let i=0; i<platforms.length; i++){
            platforms[i].move(direction);
        }
        for (let i=0; i<enemies.length; i++){
            enemies[i].move(direction);
        }
    }

    // update function

    draw() { // draws player every frame (called in a loop)
        //ctx.drawImage(this.image, this.position.x, this.position.y)
        ctx.fillStyle = 'gold';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.restore()
    }

    update() {
        ctx.save();
        const currentTime = Date.now();

        // basic movements
        if (!this.isDashing && !this.isKnockback) { // locks the player in dash motion or knockback until the dash is over
            if (keys.left.pressed) {
                this.move("l");
            }
            else if (keys.right.pressed) {
                this.move("r");
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
    }
}