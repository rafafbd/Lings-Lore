class Fork {
    constructor({x, y}) {
        const image = new Image();
        this.image = image;
        this.image.src = "./Assets/Fork.png";

        this.position = {
            x,
            y
        };

        this.attackCoordinates = { // coordinates for attack hitbox
            x: null,
            y: null,
            x2: null,
            y2: null
        }

        this.attackRange = {
            width: 100,
            height: 40
        };

        this.damage = 10;
        this.cd = 0.5; // fork attack colldown in seconds

        this.isEquiped = true; // var. to check if fork is being used
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    attack(direction) {
        ctx.save()
        ctx.fillStyle = 'green';
        switch (direction) {
            case 'l':
                this.attackCoordinates.x = this.position.x;
                this.attackCoordinates.y = this.position.y;
                this.attackCoordinates.x2 = -this.attackRange.width;
                this.attackCoordinates.y2 = this.attackRange.height;
                ctx.fillRect(this.attackCoordinates.x, this.attackCoordinates.y, this.attackCoordinates.x2, this.attackCoordinates.y2);
                break;

            case 'r':
                this.attackCoordinates.x = this.position.x + 35;
                this.attackCoordinates.y = this.position.y;
                this.attackCoordinates.x2 = this.attackRange.width;
                this.attackCoordinates.y2 = this.attackRange.height;
                ctx.fillRect(this.attackCoordinates.x, this.attackCoordinates.y, this.attackCoordinates.x2, this.attackCoordinates.y2);      
                break;
                
            case 'u':
                this.attackCoordinates.x = (player.position.x + (player.width / 2) - (this.attackRange.height / 2));
                this.attackCoordinates.y = this.position.y;
                this.attackCoordinates.x2 = this.attackRange.height;
                this.attackCoordinates.y2 = - this.attackRange.width;
                ctx.fillRect(this.attackCoordinates.x, this.attackCoordinates.y, this.attackCoordinates.x2, this.attackCoordinates.y2);
                break;
            case 'd':
                this.attackCoordinates.x = (player.position.x + (player.width / 2) - (this.attackRange.height / 2));
                this.attackCoordinates.y = this.position.y + 30;
                this.attackCoordinates.x2 = this.attackRange.height;
                this.attackCoordinates.y2 = this.attackRange.width;
                ctx.fillRect(this.attackCoordinates.x, this.attackCoordinates.y, this.attackCoordinates.x2, this.attackCoordinates.y2);
                break;
        }
        ctx.restore()
    }
    
    update() {
        if (this.isEquiped) {
            this.position.y = player.position.y + 20;
            if (player.looking.left) {
                this.position.x = player.centerPosition.x - 50;
            }
            else {
                this.position.x = player.centerPosition.x + 30;
            }
        }
        else { // is not equiped
            this.position.x = player.position.x;
            this.position.y = player.position.y;
        }
        if (keys.attack.pressed) {
            if (player.looking.left) {
                this.attack('l')
            }
            else if (player.looking.right) {
                this.attack('r')
            }
            else if (player.looking.up) {
                this.position.x = player.position.x + (this.attackRange.height / 2);
                this.position.y -= 40 
                this.attack('u')
            }
            else { // down
                this.position.x = player.position.x + (this.attackRange.height / 2);
                this.position.y += 40 
                this.attack('d')
            }
        }
        else {
            this.attackCoordinates.x = null;
            this.attackCoordinates.x2 = null;
            this.attackCoordinates.y = null;
            this.attackCoordinates.y2 = null;
        }
        this.draw()
    }
}
