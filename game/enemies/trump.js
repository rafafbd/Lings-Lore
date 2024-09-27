
class TonaldDrump extends Enemy {
    constructor(x, y){
        super({x, y})

        this.delayAttack = 5000;
        this.nextAttackTime = 0;

        this.specialAttacks = ["moneyFall", "redLines", "helpers", "dash"]
        
    }
    
    knockBack(){ // overrides knockback so that he doesnt get knock back

    }

    specialAttack(direction){
        let attack = this.specialAttacks[Math.floor(Math.random() * 4)];
        switch (attack){
            case "moneyFall": moneyFall(); break;
            case "redLines": redLines(); break;
            case "helpers": helpers(); break;
            case "dash": dash(direction);
        }
    }
    
    update(){
        let direcion = this.playerWhere();
        let currentTime = Date.now();
        if (currentTime > this.nextAttackTime){
            this.nextAttackTime += this.delayAttack;
            specialAttack(direction);
        }
    }
}

function moneyFall(){
    let distanceBetween = 50;
    let positionX = Math.random()*50;
    for (let i=0; i<9; i++){
        let note = new Note({x: positionX,
            y: -10,
            damage: 25,
            width: 40,
            height: 100,
            horizontalBool: false,
            direction: direction 
        })// -1 for left, 1 for right)
        notes.push(note);
        positionX += distanceBetween;
    }
}

function redLines(){
    
}

function helpers(){

}

function dash(direction){

}
