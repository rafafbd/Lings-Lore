
class TonaldDrump extends Enemy {
    constructor(x, y){
        super({
            x: x, 
            y: y,
        },
            "", 50, 100, 9, 10, 30, 1000, 100000 
        )

        this.delayAttack = 3000;
        this.nextAttackTime = 0;
        this.specialAttacks = ["moneyFall", "redLines", "helpers", "dash"];

        this.dashDirection = 0; // if 0, it's not dashing
        this.timeEndDash = 0;
        this.dashSpeed = 25;

        // lines attack
        this.shootRedLines = false;
        this.timeRedLines = 0; 
        this.timeActiveLines = 0;
    }
    
    knockBack(){ // overrides knockback so that he doesnt get knock back

    }

    specialAttack(direction){
        let attack = this.specialAttacks[Math.floor(Math.random() * 4)];
        switch (attack){
            case "moneyFall": this.moneyFall(); break;
            case "redLines": this.drawRedLines(); break;
            case "helpers": this.helpers(); break;
            case "dash": this.dash(direction);
        }
    }
    
    drawRedLines(){ // draws lines with %50 opacity so that the player can prepare
        ctx.fillStyle = 'rgb(255, 0, 0, 0.5)';
        ctx.fillRect(0, 1000, window.width, 50);
        ctx.fillStyle = 'rgb(255, 0, 0, 0.5)';
        ctx.fillRect(0, 500, window.width, 50);
        ctx.fillStyle = 'rgb(255, 0, 0, 0.5)';
        ctx.fillRect(0, 200, window.width, 50);
        this.shootRedLines = true;
        this.timeRedLines = Date.now() + 1500;
        this.timeActiveLines = Date.now() + 2500;
    }

    drawFinalRedLines(){
        // visual
        ctx.fillStyle = 'rgb(255, 0, 0, 1)';
        ctx.fillRect(0, 1000, window.width, 50);
        ctx.fillStyle = 'rgb(255, 0, 0, 1)';
        ctx.fillRect(0, 500, window.width, 50);
        ctx.fillStyle = 'rgb(255, 0, 0, 1)';
        ctx.fillRect(0, 200, window.width, 50);
        // application
        this.shootRedLines = false;
        lines.push(new Line(1000));
        lines.push(new Line(500));
        lines.push(new Line(200));
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
            })// -1 for left, 1 for right)
            notes.push(note);
            positionX += distanceBetween;
        }
    }

    helpers(){
        let x = Math.random() * 100;
        let bob = new Bob({x: x, y: 20});
        let jorge = new Jorge({x: x, y: 20});
        let fred = new Fred({x: x, y: 20});
        enemies.push(bob, jorge, fred);
    }

    dash(direction){
        this.dashDirection = direction;
        this.timeEndDash = Date.now() + 2000;
    }

    draw(){
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        let direction = this.playerWhere();
        let currentTime = Date.now();
        if (currentTime > this.nextAttackTime){
            this.nextAttackTime += currentTime + this.delayAttack;
            this.specialAttack(direction);
        }

        // red lines attack 
        if (this.shootRedLines && currentTime > this.timeRedLines && currentTime < this.timeActiveLines){
            this.drawFinalRedLines();
        }
        if (currentTime > this.timeActiveLines){
            for (let i=0; i<lines.length; i++){
                lines.pop();
            }
        }

        // dash attack 
        if (this.dashDirection != 0){
            if (currentTime < this.timeEndDash){
                this.velocity.x = this.dashSpeed * this.dashDirection;
            }
            else {
                this.dashDirection = 0;
            }
        }
        // normal movement
        else {
            this.velocity.x = this.speed.x * direction;
        }
        
        this.jump(); // verifies if need to jump and tries to do so

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.updatePositions();

        this.draw();
        ctx.restore();
    }
}
