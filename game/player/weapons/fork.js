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
            y: null
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
                ctx.fillRect(this.attackCoordinates.x, this.attackCoordinates.y, -this.attackRange.width,this.attackRange.height);
                break;

            case 'r':
                this.attackCoordinates.x = this.position.x + 35;
                this.attackCoordinates.y = this.position.y;
                ctx.fillRect(this.attackCoordinates.x, this.attackCoordinates.y, this.attackRange.width, this.attackRange.height);
                break;
                
            case 'u':
                this.attackCoordinates.x = (player.position.x + (player.width / 2) - (this.attackRange.height / 2));
                this.attackCoordinates.y = this.position.y - this.attackRange.width;
                ctx.fillRect(this.attackCoordinates.x, this.attackCoordinates.y, this.attackRange.height, this.attackRange.width);
                break;
            case 'd':
                this.attackCoordinates.x = (player.position.x + (player.width / 2) - (this.attackRange.height / 2));
                this.attackCoordinates.y = this.position.y + 30;
                ctx.fillRect(this.attackCoordinates.x, this.attackCoordinates.y, this.attackRange.height,this.attackRange.width);
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