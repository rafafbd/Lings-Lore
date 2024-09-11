class Enemy {
    constructor({x, y}) {
         
        
        const image = new Image()
        
        image.src = "./Assets/Bob-spritesheet.png";
        this.image = image
        this.indexX = 0
        this.indexY = 0

        this.enemiesSizes = {
            bob:{
                spriteWidth: 100,
                spriteHeight: 100,
                scale: 1
            }
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

    }
    
    increaseIndexX(){
        if (this.indexX < 16)
            this.indexX += 1
        else
            this.indexX = 3
    }
    
    draw() { // draws enemy every frame (called in a loop)
        //ctx.fillStyle = 'red';
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        
        
        ctx.drawImage(this.image,
                      this.indexX*this.enemiesSizes.bob.spriteWidth, this.indexY*this.enemiesSizes.bob.spriteHeight,
                      this.enemiesSizes.bob.spriteWidth, this.enemiesSizes.bob.spriteHeight,
                      this.position.x, this.position.y,
                      this.enemiesSizes.bob.scale*this.enemiesSizes.bob.spriteWidth, this.enemiesSizes.bob.scale*this.enemiesSizes.bob.spriteWidth)
        ctx.restore();
        this.increaseIndexX();
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
        if (player.centerPosition.y < this.centerPosition.y){
            return true;
        }
        return false;
    }

    jump() {
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

    collided(source) {
        if (source instanceof Fork) {
            this.takeDamage(source.damage);
        }
    }

    update() {
        let where = this.playerWhere();
        if (where === "playerAtLeft") {
            this.velocity.x = -this.speed.x;
        }
        else if (where === "playerAtRight"){
            this.velocity.x = this.speed.x;
        }
        else {
            this.velocity.x = 0;
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
            this.dead = true;
            ctx.restore();
        }

        this.draw();
        ctx.restore();
    }

}