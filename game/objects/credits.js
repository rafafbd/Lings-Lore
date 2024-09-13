class Credits {
    constructor({x, y}, value) {
        const image = new Image();
        this.image = image;

        // position and dimensions

        this.position = {x, y};
        this.width = 64;
        this.height = 32;
        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        };

        // floating height

        this.floatingHeight = {
            max: this.position.y - this.height/2,
            min: this.position.y + this.height/2
        }

        this.velocity = {x: 0, y: 0}; // velocities
        
        // value of the credits
        if (value === "positive") {
            this.value = 15;
            this.imageSource = "./Assets/plusSocialCredits.png";
        }
        else {
            this.value = -10;
            this.imageSource = "./Assets/minusSocialCredits.png";
        }

        this.image.src = this.imageSource;

        // flags

        this.isCollected = false;
        this.spliceThis = false;

    }

    collided(source) {
        if (source instanceof Player) {
            this.isCollected = true;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y);
        ctx.restore();
    }

    update() {
        ctx.save();
        if (this.position.y < this.floatingHeight.min && this.velocity.y > -0.7) {
            this.velocity.y = 1.2;
        }
        else if (this.position.y > this.floatingHeight.max && this.velocity.y < 0.7) {
            this.velocity.y = -1.2;
        }
        else {
            this.velocity.y *= 0.8;
        }

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        this.position2 = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        };

        if (this.isCollected) {
            this.velocity.y = -8; // make it go up
            setTimeout(() => {
                this.spliceThis = true; // remove it from the array
            }, 200)
        }

        this.draw();
    }
}