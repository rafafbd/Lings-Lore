
class TonaldDrump extends Enemy {
    constructor(x, y){
        super({
            x: x, 
            y: y,
        },
            "./Assets/spriteEnemies/TonaldSpriteSheet.png", 64, 64, 5, 20, 30, 1000, 100 
        )

        this.enemiesSizes = {
            spriteWidth: 64,
            spriteHeight: 96,
            scale: 1
        };

        this.delayAttack = 8000;
        this.nextAttackTime = Date.now() + 2500;
        this.specialAttacks = ["moneyFall", "redLines", "helpers", "dash"];
        // animation frames for each attack
        // 1: 0, 9, 3, 4
        // 2: 0, 9, 5
        // 3: 0, 9, 6, 7, 8
        // 4: 0, 9, 10, 11
        this.currentAttackStatus = {
            onAttack: false,
            whichAttack: 0,
            whichAnimationFrame: -1,
            attackReady: false,
            attackEnded: false,
            attackTriggered: false
        };
        this.timeNextAnimationFrame = 0;
        this.delayNextAnimationFrame = 10000;
        this.canChangeFrame = true;

        this.dashDirection = 0; // if 0, it's not dashing
        this.timeEndDash = 0;
        this.dashSpeed = 25;

        // lines attack
        this.timeRedLines = 0; 
        this.timeActiveLines = 0;
        this.isFirstTime = true;
    }
    
    knockBack(){ // overrides knockback so that he doesnt get knock back
    }

    resetCurrentAttackStatus(){
        this.currentAttackStatus = {
            onAttack: false,
            whichAttack: 0,
            whichAnimationFrame: -1,
            attackReady: false,
            attackEnded: false,
            attackTriggered: false
        };
    }
    
    // attacks -----------------------------------------------------------------------------

    specialAttack(){
        let attack = Math.ceil(Math.random() * 4);
        this.currentAttackStatus.whichAttack = attack;
    }

    drawRedLines(){ // draws lines with %50 opacity so that the player can prepare
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 620, 5000, 50);
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 250, 5000, 50);
    }

    drawFinalRedLines(){
        // visual
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(0, 620, 5000, 50);
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(0, 250, 5000, 50);
    }

    pushRedLines(){
        lines.push(new Line(620), new Line(250));
    }

    popLines(){
        for (let i=0; i<=lines.length; i++){
            lines.pop();
        }
    }


    moneyFall(){
        let distanceBetween = 250;
        let positionX = Math.random()*50;
        for (let i=0; i<9; i++){
            let note = new Note({x: positionX,
                y: -10,
                damage: 25,
                width: 40,
                height: 100,
                horizontalBool: false,
                direction: 1
            })
            notes.push(note);
            positionX += distanceBetween;
        }
    }

    helpers(){
        let x = Math.random() * 500;
        let bob = new Bob({x: x, y: 20});
        let jorge = new Jorge({x: x, y: 20});
        let fred = new Fred({x: x, y: 20});
        let robert = new Robert({x: x, y: 20})
        enemies.push(bob, jorge, robert, fred);
    }

    dash(direction){
        this.dashDirection = direction;
        this.timeEndDash = Date.now() + 2000;
    }

    // start animation handling ------------------------------------------------------------

    changeIndexX(newIndexX){
        if (Date.now() > this.timeNextAnimationFrame){
            this.timeNextAnimationFrame += this.delayNextAnimationFrame;
            this.indexX = newIndexX;
        }
    }

    handleAnimationNotAttacking(){
        if (this.canChangeFrame){
            if (this.indexX === 1){
                this.changeIndexX(2);
            }
            else {
                this.changeIndexX(1);
            }
        }
    }

    handleAnimationAttacking1(){ // moneyFall
        if (this.currentAttackStatus.whichAnimationFrame === 9){
            this.canChangeFrame = false;
            this.changeIndexX(3);
            this.currentAttackStatus.whichAnimationFrame = 3;
            setTimeout(() => {
                this.canChangeFrame = true;
            }, 2000);
        }

        else if (this.currentAttackStatus.whichAnimationFrame === 3){
            this.canChangeFrame = false;
            this.changeIndexX(4);
            this.currentAttackStatus.whichAnimationFrame = 4;
            setTimeout(() => {
                this.canChangeFrame = true;
            }, 2000);
        }

        else {
            this.currentAttackStatus.attackReady = true;
        }
    }

    handleAnimationAttacking2(){ // redLines
        if (this.currentAttackStatus.whichAnimationFrame === 9){
            this.canChangeFrame = false;
            this.changeIndexX(5);
            this.currentAttackStatus.whichAnimationFrame = 5;
            setTimeout(() => {
                this.canChangeFrame = true;
            }, 2000);
        }

        else {
            this.currentAttackStatus.attackReady = true;
        }
    }

    handleAnimationAttacking3(){ // helpers
        if (this.currentAttackStatus.whichAnimationFrame === 9){
            this.canChangeFrame = false;
            this.changeIndexX(6);
            this.currentAttackStatus.whichAnimationFrame = 6;
            setTimeout(() => {
                this.canChangeFrame = true;
            }, 2000);
        }

        else if (this.currentAttackStatus.whichAnimationFrame === 6){
            this.canChangeFrame = false;
            this.changeIndexX(7);
            this.currentAttackStatus.whichAnimationFrame = 7;
            setTimeout(() => {
                this.canChangeFrame = true;
            });
        }

        else if (this.currentAttackStatus.whichAnimationFrame === 7){
            this.canChangeFrame = false;
            this.changeIndexX(8);
            this.currentAttackStatus.whichAnimationFrame = 8;
            setTimeout(() => {
                this.canChangeFrame = true;
            });
        }

        else {
            this.currentAttackStatus.attackReady = true;
        }
    }

    handleAnimationAttacking4(){ // dash
        if (this.currentAttackStatus.whichAnimationFrame === 9){
            this.canChangeFrame = false;
            this.changeIndexX(10);
            this.currentAttackStatus.whichAnimationFrame = 10;
            setTimeout(() => {
                this.canChangeFrame = true;
            }, 2000);
        }

        else if (this.currentAttackStatus.whichAnimationFrame === 10){
            this.canChangeFrame = false;
            this.changeIndexX(11);
            this.currentAttackStatus.whichAnimationFrame = 11;
            setTimeout(() => {
                this.canChangeFrame = true;
            }, 2000);
        }

        else {
            this.currentAttackStatus.attackReady = true;
        }
    }

    handleAnimationAttacking(){
        if (this.currentAttackStatus.whichAnimationFrame === -1){
            this.changeIndexX(0);
            this.currentAttackStatus.whichAnimationFrame = 0;
        }

        else if (this.currentAttackStatus.whichAnimationFrame === 0){
            this.changeIndexX(9);
            this.currentAttackStatus.whichAnimationFrame = 9;
        }

        else {
            switch (this.currentAttackStatus.whichAttack){
                case 1: this.handleAnimationAttacking1(); break;
                case 2: this.handleAnimationAttacking2(); break;
                case 3: this.handleAnimationAttacking3(); break;
                case 4: this.handleAnimationAttacking4();
            }
        }
    }

    // end animation handling -------------------------------------------------------

    handleAttacks(direction, currentTime){
        if (this.currentAttackStatus.attackReady === true){

            // moneyFall
            if (this.currentAttackStatus.whichAttack === 1){
                this.moneyFall();
                this.currentAttackStatus.attackEnded = true;
            }


            // red lines attack 
            else if (this.currentAttackStatus.whichAttack === 2){
                if (this.isFirstTime){
                    this.timeRedLines = currentTime + 1500;
                    this.timeActiveLines = currentTime + 2500;
                    this.isFirstTime = false;
                }

                if (currentTime < this.timeRedLines){
                    this.drawRedLines();
                }

                else {
                    if (this.currentAttackStatus.attackTriggered === false){
                        this.pushRedLines();
                        this.currentAttackStatus.attackTriggered = true;
                    }

                    if (currentTime < this.timeActiveLines){
                        this.drawFinalRedLines();
                    }

                    if (currentTime > this.timeActiveLines){
                        this.popLines();
                        this.isFirstTime = true;
                        this.currentAttackStatus.attackEnded = true;
                    }
                }
            }


             // helpers
             else if (this.currentAttackStatus.whichAttack === 3){
                this.helpers();
                this.currentAttackStatus.attackEnded = true;
             }
             

            // dash 
            else if (this.currentAttackStatus.whichAttack === 4){
                if (this.currentAttackStatus.attackTriggered === false){
                    this.dash(direction);
                    this.currentAttackStatus.attackTriggered = true;
                }

                else {
                    if (currentTime < this.timeEndDash){
                        this.velocity.x = this.dashSpeed * this.dashDirection;
                    }
                    else {
                        this.dashDirection = 0;
                        this.currentAttackStatus.attackEnded = true;
                    }
                }
            }
        }

        if (this.currentAttackStatus.attackEnded === true){
            this.resetCurrentAttackStatus();
            this.nextAttackTime = Date.now() + this.delayAttack;
        }
    }

    // Boss UI


    update(){
        let direction = this.playerWhere();
        let currentTime = Date.now();

        if (currentTime > this.nextAttackTime && this.currentAttackStatus.onAttack === false){
            this.specialAttack();
            this.currentAttackStatus.onAttack = true;
        }

        if (this.currentAttackStatus.onAttack === true){
            this.handleAnimationAttacking();
            this.handleAttacks(direction, currentTime);
        }

        else {
            this.velocity.x = this.speed.x * direction;
            this.handleAnimationNotAttacking();
            this.resetCurrentAttackStatus();
        }

        if (direction === 1){
            ctx.save();
            ctx.translate(this.position.x + this.width*2, this.position.y);
            ctx.scale(-1, 1); // inverts the context
            ctx.translate(-this.position.x, -this.position.y);
        }

        this.jump(); // verifies if need to jump and tries to do so

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

    
        if (this.position.y > canvas.height){
            this.position = {
                x: 1000,
                y: 200
            };
        }

        this.updatePositions();

        if (this.hp <= 0) {
            let howManyCredits = this.creditsValue / 10;
            for (let i = 1; i < howManyCredits; i++) {
                components.credits.push(new Credits({ // creates a new positive credits object to make player lose credits
                    x: this.position.x,
                    y: this.position.y - 20 - (i * 20),
                }, "positive"));
            }
            this.dead = true;
            ctx.restore();
        }
        if (this.dead) {
            ctx.restore();
        }

        this.draw();
        ctx.restore();
    }

    draw() {
        if (this.canPlay) {
            ctx.drawImage(this.image,
                        this.indexX*this.enemiesSizes.spriteWidth, this.indexY*this.enemiesSizes.spriteHeight,
                        this.enemiesSizes.spriteWidth, this.enemiesSizes.spriteHeight,
                        this.position.x, this.position.y,
                        this.enemiesSizes.scale*this.enemiesSizes.spriteWidth, this.enemiesSizes.scale*this.enemiesSizes.spriteWidth);
            ctx.restore();
        }
    }
}


