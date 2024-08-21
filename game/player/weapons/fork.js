import { ctx } from "game/index.js";
import { Player } from ".../index.js";
export class Fork {
    constructor(x, y) {
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
            width: 80,
            height: 30
        };

        this.damage = 10;
        this.cd = 0.5; // fork attack colldown in seconds

        this.isEquiped = True; // var. to check if fork is being used
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    attack(direction) {
        ctx.save()
        ctx.fillStyle = 'green';
        switch (direction) {
            case 'l':
                ctx.fillRect(this.position.x, this.position.y, this.position.x - this.attackRange.width, this.position.y + this.attackRange.height);
                this.attackCoordinates.x = this.position.x;
                this.attackCoordinates.y = this.position.y;
                this.attackCoordinates.x2 = this.position.x - this.attackRange.width;
                this.attackCoordinates.y2 =  this.position.y + this.attackRange.height;
                break;

            case 'r':
                ctx.fillRect(this.position.x, this.position.y, this.position.x + this.attackRange.width, this.position.y + this.attackRange.height);
                this.attackCoordinates.x = this.position.x;
                this.attackCoordinates.y = this.position.y;
                this.attackCoordinates.x2 = this.position.x + this.attackRange.width;
                this.attackCoordinates.y2 =  this.position.y + this.attackRange.height;
                break;
                
            case 'u':
                ctx.fillRect((Player.position.x + (Player.width / 2) - (this.attackRange.height / 2)), Player.position.y - 40, (Player.position.x + (Player.width / 2) + (this.attackRange.height / 2)), Player.position.y - 40 + this.attackRange.width);
                this.attackCoordinates.x = (Player.position.x + (Player.width / 2) - (this.attackRange.height / 2));
                this.attackCoordinates.y = this.position.y - 40;
                this.attackCoordinates.x2 = (Player.position.x + (Player.width / 2) + (this.attackRange.height / 2));
                this.attackCoordinates.y2 = Player.position.y - 40 - this.attackRange.width;
                break;
            case 'd':
                ctx.fillRect((Player.position.x + (Player.width / 2) - (this.attackRange.height / 2)), Player.position.y + 40, (Player.position.x + (Player.width / 2) + (this.attackRange.height / 2)), Player.position.y + 40 + this.attackRange.width);
                this.attackCoordinates.x = (Player.position.x + (Player.width / 2) - (this.attackRange.height / 2));
                this.attackCoordinates.y = this.position.y + 40 + Player.height;
                this.attackCoordinates.x2 = (Player.position.x + (Player.width / 2) + (this.attackRange.height / 2));
                this.attackCoordinates.y2 = Player.position.y + 40 + this.attackRange.width + Player.height;
                break;
        }
        ctx.restore()
    }
    
    update(keys) {
        if (this.isEquiped) {
            if (Player.looking.left) {
                this.position.x = Player.centerPosition.x - 50;
            }
            else {
                this.position.x = Player.centerPosition.x + 50;
            }
        }
        else { // is not equiped
            this.position.x = Player.position.x;
            this.position.y = Player.position.y;
        }
        if (keys.attack.pressed) {
            if (Player.looking.left) {
                this.attack('l')
            }
            else if (Player.looking.right) {
                this.attack('r')
            }
            else if (Player.looking.up) {
                this.attack('u')
            }
            else { // down
                this.attack('d')
            }
        }
        else {
            this.attackCoordinates.forEach(coordinate => {
                coordinate = null;
            });
        }
        this.draw()
    }
}
