class Fork {
    constructor({x, y}) {
        const image = new Image();
        this.image = image;
        this.image.src = "./Assets/fork4.png";

        this.position = {
            x,
            y
        };

        this.width = 32;
        this.height = 32;

        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        }

        this.attackCoordinates = { // coordinates for attack hitbox
            x: null,
            y: null
        }

        this.attackRange = {
            width: 140,
            height: 60
        };
        this.originalWidth = this.attackRange.width;
        this.originalHeight = this.attackRange.height;

        this.damage = 50;
        let d = new Date();
        this.attackTimer = d.getTime()/1000;
        this.cd = 0.5; // fork attack colldown in seconds

        this.knockBackTimer = d.getTime()/1000;
        this.knockBackCd = 0.5;

        this.isEquiped = true; // var. to check if fork is being used
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y);
        ctx.restore();
    }

    attack(direction) {
        let d = new Date();
        let time = d.getTime()/1000;
        if (time - this.attackTimer > this.cd){
            ctx.save()
            ctx.fillStyle = 'green';
            switch (direction) {
                case 'l':
                    this.attackCoordinates.x = this.position.x - this.attackRange.width;
                    this.attackCoordinates.y = this.position.y;
                    this.position.x = this.attackCoordinates.x + player.width*3;
                    this.position.y = this.attackCoordinates.y;
                    break;

                case 'r':
                    this.attackCoordinates.x = this.position.x + this.width;
                    this.attackCoordinates.y = this.position.y - this.attackRange.height/6;
                    this.position.x = this.attackCoordinates.x;
                    this.position.y = this.attackCoordinates.y + this.attackRange.height/6;
                    break;
                    
                case 'u':
                    this.attackCoordinates.x = this.position.x - this.attackRange.width/4;
                    this.attackCoordinates.y = this.position.y - this.attackRange.height;
                    this.position.x = this.attackCoordinates.x + this.attackRange.width/3;
                    this.position.y = this.attackCoordinates.y + this.attackRange.height/1.5;
                    break;
                case 'd':
                    this.attackCoordinates.x = (player.position.x + (player.width / 2) - (this.attackRange.width / 2));
                    this.attackCoordinates.y = this.position.y;
                    this.position.x = this.attackCoordinates.x + this.attackRange.width/4;
                    this.position.y = this.attackCoordinates.y - player.height/2;
                    break;
            }
            ctx.restore()
            this.attackTimer = time;
        }
        
    }

    collided(source) {
        if (source instanceof Enemy) {
            let d = new Date();
            let time = d.getTime()/1000;
            if (time - this.knockBackTimer > this.knockBackCd){
                player.knockBack("fork");
            }
            this.knockBackTimer = time;
        }   
    }
    
    update() {
        ctx.save();
        if (this.isEquiped) {
            this.position.y = player.position.y;
            if (player.looking.left) {
                this.position.x = player.position.x;
                this.position.y += 10;
                ctx.translate(this.position.x, this.position.y);
                ctx.scale(-1, 1); // inverts the context
                ctx.translate(-this.position.x, -this.position.y);
            }
            else if (player.looking.right) {
                this.position.x = player.position2.x;
                this.position.y += 10;
            }
            else if (player.looking.up) {
                this.position.x = player.position.x + (this.height / 2);
                this.position.y = player.position.y - this.height;
            }
            else if (player.looking.down) {
                this.position.x = player.position.x + (this.height / 2);
                this.position.y = player.position.y + this.height + player.height;
                ctx.translate(this.position.x, this.position.y );
                ctx.scale(1, -1);
                ctx.translate(-this.position.x, -this.position.y);
            }

            if (keys.attack.pressed) {
                if (player.looking.left) {
                    this.attackRange = { // resets width and height
                        width: this.originalWidth,
                        height: this.originalHeight
                    };
                    this.attack('l')
                }
                else if (player.looking.right) {
                    this.attackRange = { // resets width and height
                        width: this.originalWidth,
                        height: this.originalHeight
                    };
                    this.attack('r')
                }
                else if (player.looking.up) {
                    this.attackRange = { // swaps values
                        width: this.originalHeight,
                        height: this.originalWidth
                    };
                    this.attack('u')
                }
                else { // down
                    this.attackRange = { // swaps values
                        width: this.originalHeight,
                        height: this.originalWidth
                    };
                    this.attack('d')
                }
            }
            else {
                this.attackCoordinates.x = null;
                this.attackCoordinates.x2 = null;
                this.attackCoordinates.y = null;
                this.attackCoordinates.y2 = null;
            }
        }
        else { // is not equiped
            this.position.x = player.position.x;
            this.position.y = player.position.y;
        }
        this.draw()
    }
}
