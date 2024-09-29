class Chopsticks {
    constructor({x, y}) {
        const image = new Image();
        this.image = image;
        this.image.src = "./Assets/spriteChopsticks/doisChopsticks.png";

        this.canPlay = false;

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
        if (!this.canPlay) {
            return;
        }
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
                    this.position.x -= 20;
                    this.position.y += 10;
                    sticks.push(new Stick({
                        x: this.position.x - 20,
                        y: this.position.y,
                        direction: direction
                    }));
                    break;
                
                case 1: // right
                    this.position.x += 20;
                    this.position.y += 10;
                    sticks.push(new Stick({
                        x: this.position.x + 20,
                        y: this.position.y,
                        direction: direction
                    }));
                    break;
                
                case -2: // up
                    this.position.x += 10;
                    this.position.y -= 20;
                    sticks.push(new Stick({
                        x: this.position.x,
                        y: this.position.y - 20,
                        direction: direction
                    }));
                    break;
                
                case 2: // down
                    this.position.x += 10;
                    this.position.y += 20;
                    sticks.push(new Stick({
                        x: this.position.x,
                        y: this.position.y + 20,
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
        
        this.position.x = player.position.x;
        this.position.y = player.position.y;
        this.draw()
    }
}
