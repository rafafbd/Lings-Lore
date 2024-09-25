class Chopsticks {
    constructor({x, y}) {
        const image = new Image();
        this.image = image;
        this.image.src = "./Assets/spriteFork/forkMelhorado.png";

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

        this.ammo = 10;
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

            switch (direction) {
                case 'l':
                    this.position.x -= 20;
                    this.position.y += 10;
                    sticks.push(new Stick({
                        x: this.position.x - 20,
                        y: this.position.y,
                        direction: 'l'
                    }));
                    break;
                
                case 'r':
                    this.position.x += 20;
                    this.position.y += 10;
                    sticks.push(new Stick({
                        x: this.position.x + 20,
                        y: this.position.y,
                        direction: 'r'
                    }));
                    break;
                
                case 'u':
                    this.position.x += 10;
                    this.position.y -= 20;
                    sticks.push(new Stick({
                        x: this.position.x,
                        y: this.position.y - 20,
                        direction: 'u'
                    }));
                    break;
                
                case 'd':
                    this.position.x += 10;
                    this.position.y += 20;
                    sticks.push(new Stick({
                        x: this.position.x,
                        y: this.position.y + 20,
                        direction: 'd'
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

        setTimeout(() => {
            this.ammo++;
        }, 5000)


        if (keys.shoot.pressed && this.isEquipped) {
            this.attack(player.direction);
        }
        
        this.position.x = player.position.x;
        this.position.y = player.position.y;
        this.draw()
    }
}
