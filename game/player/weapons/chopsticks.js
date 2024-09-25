class Chopsticks {
    constructor({x, y}) {
        const image = new Image();
        this.image = image;
        this.image.src = "./Assets/spriteFork/forkMelhorado.png";

        this.position = {
            x,
            y
        };

        this.width = 32;
        this.height = 32;

        this.damage = 20;
        let d = new Date();
        this.attackTimer = d.getTime()/1000;
        this.cd = 0.5; // chopsticks attack colldown in seconds

        this.isEquipped = true; // var. to check if chopsticks is being used
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
            ctx.restore()
            music.playMusic(3)
            this.attackTimer = time;
        }
        
    }
    
    update() {
        ctx.save();

        if (keys.shoot.pressed && this.isEquipped) {
            this.attack(player.direction);
        }
        
        this.position.x = player.position.x;
        this.position.y = player.position.y;
        this.draw()
    }
}
