class Chopsticks {
    constructor({x, y}) {
        const image = new Image();
        this.image = image;
        this.image.src = "./Assets/spriteChopstick/doisChopsticks.png";

        this.position = {
            x,
            y
        };

        this.width = 96;
        this.height = 96;

        let d = new Date();
        this.attackTimer = d.getTime()/1000;
        this.cd = 0.5; // chopsticks attack colldown in seconds

        this.isEquipped = false; // var. to check if chopsticks is being used


        this.canReload = true;
        this.ammo = 2;
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y);
        ctx.restore();
    }

    attack(direction) {
        let d = new Date();
        let time = d.getTime()/1000;
        if (time - this.attackTimer > this.cd && this.ammo > 0){
            ctx.save()
            
            switch (direction) {
                case -1: // left
                    sticks.push(new Stick({
                        x: this.position.x - 10,
                        y: this.position.y + 30,
                        direction: direction
                    }));
                    break;
                
                case 1: // right
                    sticks.push(new Stick({
                        x: this.position.x + 60,
                        y: this.position.y + 30,
                        direction: direction
                    }));
                    break;
                
                case -2: // up
                    sticks.push(new Stick({
                        x: this.position.x + 40,
                        y: this.position.y - 40,
                        direction: direction
                    }));
                    break;
                
                case 2: // down
                    sticks.push(new Stick({
                        x: this.position.x + 40,
                        y: this.position.y + 40,
                        direction: direction
                    }));
                    break;
            }


            this.ammo--;

            ctx.restore()
            music.playMusic(3)
            this.attackTimer = time;
        }
        
    }
    
    update() {
        ctx.save();

        if (this.ammo < 2 && this.canReload) {
            this.canReload = false;
            setTimeout(() => {
                this.ammo++;
                this.canReload = true;
            }, 1500)
        }


        if (keys.attack.pressed && this.isEquipped) {
            this.attack(player.direction);
        }
        
        this.position.x = player.position.x - player.width/4;
        this.position.y = player.position.y - player.height/4;

        if (this.ammo == 2) {
            this.image.src = "./Assets/spriteChopstick/doisChopsticks.png"; // change image to 2 chopsticks
        }
        else if (this.ammo == 1) {
            this.image.src = "./Assets/spriteChopstick/umChopstick.png"; // change image to 1 chopstick
        }
        else if (this.ammo == 0) {
            this.image.src = "./Assets/spriteChopstick/zeroChopsticks.png"; // change image to 0 chopsticks
        }
        this.draw()
    }
}
