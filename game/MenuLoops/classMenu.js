class Menus {
    constructor(xMouse, yMouse) {

        this.mouseClickPosition = {
            x: xMouse,
            y: yMouse
        };

        this.canPlay = false
        this.background = new Image();
        this.background.src = "./Assets/spriteBackground/background3.png";
        this.background.onload = () => {
            this.canPlay = true
        }


        this.buttonX = new Image();
        this.buttonX.src = "./Assets/spriteButtons/buttonX.png";

        this.buttonPlay = new Image();
        this.buttonPlay.src = "./Assets/spriteButtons/buttonPlay.png";

        this.buttonLore = new Image();
        this.buttonLore.src = "./Assets/spriteButtons/buttonLore.png";

        this.buttonCommands = new Image();
        this.buttonCommands.src = "./Assets/spriteButtons/buttonCommands.png";

        this.buttonCareer = new Image();
        this.buttonCareer.src = "./Assets/spriteButtons/buttonCareer.png"

        this.buttonEndless = new Image();
        this.buttonEndless.src = "./Assets/spriteButtons/buttonEndless.png"

        this.buttonMenu = new Image();
        this.buttonMenu.src = "./Assets/spriteButtons/buttonMenu.png"

        this.textLore = "Na costa oeste dos Estados Unidos, o restaurante '變態的食物' é um verdadeiro tesouro, conhecido por seus dumplings feitos com receitas passadas de geração em geração. Porém, a tranquilidade do local é ameaçada quando uma corporação Capitalista decide comprar o restaurante, prometendo modernização, mas na verdade, desrespeitando a tradição e o legado familiar."
        this.textLore2 = "Ling, um dumpling que ganhou vida após um ritual da avó, se vê em uma luta desesperada para salvar seu lar. Junto a outros pratos tradicionais, Ling descobre que a Sabor Global não apenas visa o lucro, mas também pretende homogeneizar a cultura alimentar, substituindo sabores autênticos por opções industrializadas e sem alma. "
        this.textLore3 = "Ao longo de sua jornada, Ling enfrenta os capangas da corporação capitaliasta e desmantela seus planos, revelando a importância da comida como símbolo de identidade e resistência. Cada batalha o aproxima da verdade sobre suas raízes e da força que a comunidade pode ter quando se une por um propósito comum, mas também do grande chefe do capitalismo.";
        this.textLore4 = "Será Ling capaz de vencer o Capitalismo?"
        this.currentPage = "menu";
        this.maxWidth = 600; // Maximum width of each line
        this.lineHeight = 24;

        this.buttons = {
            playButton: {
                x: (canvas.width-400)/2,
                y: 350,
                w: 400,
                h: 100
            },
            loreButton: {
                x: (canvas.width-400)/2,
                y: 500,
                w: 400,
                h: 100
            },
            commandsButton: {
                x: (canvas.width-400)/2,
                y: 650,
                w: 400,
                h: 100
            },
            careerButton: {
                x: (canvas.width-400)/2,
                y: 350,
                w: 400,
                h: 100
            },
            endlessButton: {
                x: (canvas.width-400)/2,
                y: 500,
                w: 400,
                h: 100
            },
            menuButton: {
                x: (canvas.width-400)/2,
                y: 650,
                w: 400,
                h: 100
            },

        };

        this.commandArray = [
            { text: "W         - Mirar para cima",           x: 750, y: 300, maxW: 1000 },
            { text: "A         - Mirar/Andar para esquerda", x: 750, y: 360, maxW: 1000 },
            { text: "S         - Mirar para baixo",          x: 750, y: 420, maxW: 1000 },
            { text: "D         - Mirar/Andar para direita",  x: 750, y: 480, maxW: 1000 },
            { text: "J         - Atacar",                    x: 750, y: 540, maxW: 1000 },
            { text: "K         - Dash",                      x: 750, y: 600, maxW: 1000 },
            { text: "Space - Pular",                         x: 750, y: 660, maxW: 1000 },
            { text: "I         - Trocar de arma",            x: 750, y: 720, maxW: 1000 },
            { text: "1         - Equipar garfo",             x: 750, y: 780, maxW: 1000 },
            { text: "2         - Equipar hashi",             x: 750, y: 840, maxW: 1000 }
        ];

        this.currentLevel = 1;
        this.firstLoadLevel = true;
        this.passedLevel = false;

        this.totalDistanceX = 0;
        this.totalDistanceY = 0;

        this.deathZone = 1000;

        // endless mode variables
        this.currentWave = 0;
        this.nextEndlessWave = true;
        this.numberOfEnemies = 0;
        this.currentAmountOfEnemies = 0;
        // Ensure ctx is available globally or passed in as needed
    }

    getCurrentPage = () => {
        return this.currentPage;
    }

    updateMousePositions = (xMouse, yMouse) => {
        this.mouseClickPosition.x = xMouse;
        this.mouseClickPosition.y = yMouse;
    }

    menuLoop = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black"
        ctx.font = "50px Arial";
        ctx.fillText("Ling's Lore", 830, 200, 300);

        ctx.drawImage(this.buttonPlay, this.buttons.playButton.x, this.buttons.playButton.y/* , this.buttons.playButton.w, this.buttons.playButton.h*/);
        
        ctx.drawImage(this.buttonLore, this.buttons.loreButton.x, this.buttons.loreButton.y/*, this.buttons.loreButton.w, this.buttons.loreButton.h */);
        
        ctx.drawImage(this.buttonCommands, this.buttons.commandsButton.x, this.buttons.commandsButton.y/*, this.buttons.commandsButton.w, this.buttons.commandsButton.h */);
        
        if (this.mouseClickPosition.x >= this.buttons.playButton.x &&
            this.mouseClickPosition.x <= this.buttons.playButton.x + this.buttons.playButton.w &&
            this.mouseClickPosition.y >= this.buttons.playButton.y &&
            this.mouseClickPosition.y <= this.buttons.playButton.y + this.buttons.playButton.h){
            this.currentPage = "selectGamemode";
        }
    
        else if (this.mouseClickPosition.x >= this.buttons.loreButton.x &&
            this.mouseClickPosition.x <= this.buttons.loreButton.x + this.buttons.loreButton.w &&
            this.mouseClickPosition.y >= this.buttons.loreButton.y &&
            this.mouseClickPosition.y <= this.buttons.loreButton.y + this.buttons.loreButton.h){
            this.currentPage = "lore";
        }
        
        else if (this.mouseClickPosition.x >= this.buttons.commandsButton.x &&
            this.mouseClickPosition.x <= this.buttons.commandsButton.x + this.buttons.commandsButton.w &&
            this.mouseClickPosition.y >= this.buttons.commandsButton.y &&
            this.mouseClickPosition.y <= this.buttons.commandsButton.y + this.buttons.commandsButton.h){
            this.currentPage = "commands";
        }

        if (this.currentPage == "menu"){
            
            requestAnimationFrame(this.menuLoop)
        }
        
    }

    chooseGamemode = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle  = "grey"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = "black"
        ctx.font = "50px Arial";
        ctx.fillText("Ling's Lore", 800, 200, 300);

        ctx.drawImage(this.buttonCareer, this.buttons.careerButton.x, this.buttons.careerButton.y/* , this.buttons.playButton.w, this.buttons.playButton.h*/);
        
        ctx.drawImage(this.buttonEndless, this.buttons.endlessButton.x, this.buttons.endlessButton.y/*, this.buttons.loreButton.w, this.buttons.loreButton.h */);

        ctx.drawImage(this.buttonMenu, this.buttons.menuButton.x, this.buttons.menuButton.y)

        if (this.mouseClickPosition.x >= this.buttons.playButton.x &&
            this.mouseClickPosition.x <= this.buttons.playButton.x + this.buttons.playButton.w &&
            this.mouseClickPosition.y >= this.buttons.playButton.y &&
            this.mouseClickPosition.y <= this.buttons.playButton.y + this.buttons.playButton.h){
            this.currentPage = "career";
            this.currentLevel = 1;
        }
    
        else if (this.mouseClickPosition.x >= this.buttons.loreButton.x &&
            this.mouseClickPosition.x <= this.buttons.loreButton.x + this.buttons.loreButton.w &&
            this.mouseClickPosition.y >= this.buttons.loreButton.y &&
            this.mouseClickPosition.y <= this.buttons.loreButton.y + this.buttons.loreButton.h){
            this.currentPage = "endless";
        }
        
        else if (this.mouseClickPosition.x >= this.buttons.commandsButton.x &&
            this.mouseClickPosition.x <= this.buttons.commandsButton.x + this.buttons.commandsButton.w &&
            this.mouseClickPosition.y >= this.buttons.commandsButton.y &&
            this.mouseClickPosition.y <= this.buttons.commandsButton.y + this.buttons.commandsButton.h){
            this.currentPage = "menu";
        }


        if (this.currentPage == "selectGamemode"){
            requestAnimationFrame(this.menuLoop)
        }


    }

    commandsPage = () => {

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle  = "grey"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = "black"
        ctx.font = "50px Arial";
        ctx.fillText("Ling's Lore", 800, 200, 300);
        ctx.font = "25px Arial"
        for (let i = 0; i<this.commandArray.length ; i++){
            ctx.fillText(this.commandArray[i].text,
                         this.commandArray[i].x, 
                         this.commandArray[i].y,
                         this.commandArray[i].maxW,
    
            )
        }
        /*------------      Back to menu button     --------------*/   
        ctx.drawImage(this.buttonX, 10, 10)
    
        if (this.mouseClickPosition.x >= 10 &&
            this.mouseClickPosition.x <= 60 &&
            this.mouseClickPosition.y >= 10 &&
            this.mouseClickPosition.y <= 60
        ){
            this.currentPage = "menu";
        }

        /*------------      Loop               --------------*/  
        if (this.currentPage == "commands"){
            requestAnimationFrame(this.commandsPage);
        }
    }

    lorePage = () => {
    
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "grey"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = "black"
        ctx.font = "50px Arial";
        ctx.fillText("Ling's Lore", 700, 200, 300);
        ctx.font = "15px Arial";
        this.wrapText(this.textLore, 550, 300, this.maxWidth, this.lineHeight)
        this.wrapText(this.textLore2, 550, 450, this.maxWidth, this.lineHeight)
        this.wrapText(this.textLore3, 550, 570, this.maxWidth, this.lineHeight)
        ctx.font = "30px Arial";
        ctx.fillText(this.textLore4, 550, 750, 1000);

        ctx.drawImage(this.buttonX, 10, 10);

        if (this.mouseClickPosition.x >= 10 &&
            this.mouseClickPosition.x <= 60 &&
            this.mouseClickPosition.y >= 10 &&
            this.mouseClickPosition.y <= 60
        ){
            this.currentPage = "menu";
        }


        if (currentPage == "lore"){
            requestAnimationFrame(this.lorePage);
        }
    }

    wrapText(text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
    
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
    
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight; // Move to the next line
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y); // Draw the last line
    }

    drawBackground() {
        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height)
    }


    playerLoop = () => {
        if (this.firstLoadLevel || this.passedLevel) {
            this.totalDistance = 0;
            switch (this.currentLevel) {
                case 0:
                    endless();
                    break;
                case 1:
                    level1();
                    break;
                case 2:
                    level2();
                    break;
                case 3:
                    level3();
                    break;
                case 4:
                    level4();
                    break;
            }
            this.firstLoadLevel = false;
            this.passedLevel = false;
        }
    
        //----------------------------------------------------------------
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        
        this.drawBackground()

        ctx.font = "50px Times new Roman";
        ctx.fillStyle = "red";
        ctx.fillText("Ling's Lore", 800, 100);

        ctx.restore();
    
        // ---------------------------------------------------------------
        //                           PLATFORMS
        // updates and draws the platforms
        ctx.fillStyle = '#000000';
        for (let i = platforms.length - 1; i >= 0; i--){ 
            platforms[i].update();
        }
        // checks collision between player and platforms
        let platform = rectangleColision(player, platforms); // returns collided platform's index
        if (platform != null) {
            player.collided(platforms[platform]);
        }
        else { // no collision detected
            player.isOnFloor = false;
        }
    
        // -----------------------------------------
        // enemy section down below
    
        for (let i=0; i<enemies.length; i++){
            enemies[i].update();
            if (enemies[i].dead || enemies[i].position.y > this.deathZone) {
                ctx.restore();
                let deadEnemy = i;
                enemies.splice(deadEnemy, 1); // removes dead enemy from array
                if (i != 0) {
                    i--;
                }
            }
            // enemy collision with platforms
            if (enemies.length > 0) {
                platform = rectangleColision(enemies[i], platforms); // returns collided platform's index
                if (platform != null) {
                    enemies[i].collided(platforms[platform]);
                }
                else { // no collision detected
                    enemies[i].isOnFloor = false;
                }
            }
        };
    
        if (keys.attack.pressed) { // checks if the player is attacking
            let enemy;
            switch (player.currentWeapon) { // different hitbox and damage based on current weapon
                
                case "fork":
                    enemy = weaponRectangleColision(player.fork, enemies); // returns list of enemies hit
                    if (enemy != null) {
                        for (let j = 0; j<enemy.length; j++) {
                            player.fork.collided(enemies[enemy[j]]);
                            enemies[enemy[j]].collided(player.fork);
                        }
                    }
                    break;
                case "chopsticks":
                    enemy = weaponRectangleColision(player.fork, enemies); // returns list of enemies hit
                    if (enemy != null) {
                        for (let j = 0; j<enemy.length; j++) {
                            player.fork.collided(enemies[enemy[j]]);
                            enemies[enemy[j]].collided(player.fork);
                        }
                    }
                break;
            }
        }

        // ------------------------------------------------------

        // Notes
        if (notes.length > 0){
            for (let i=0; i<notes.length; i++){
                notes[i].update();
            }
            let whichNoteCollided = rectangleColision(player, notes); // checks collision between player and enemies
            if (whichNoteCollided != null) {
                player.collided(notes[whichNoteCollided]);
            }
        }
        

        // ------------------------------------------------------

        // Sticks

        if (sticks.length > 0) {
            for (let i = 0; i < sticks.length; i++) {
                let enemyHit = rectangleColision(sticks[i], enemies); // checks wich enemy was hit by the stick
                if (enemyHit != null) {
                    sticks[i].collided(enemies[enemyHit]);
                    enemies[enemyHit].collided(sticks[i]);
                }

                if (sticks[i].isDestroyed) { // removes stick from array if it was destroyed
                    sticks.splice(i, 1);
                    i--;
                }
                else {
                    sticks[i].update();
                }
            }
        }

        // ------------------------------------------------------
        
        //Door
        if(this.currentLevel != 0 && this.currentLevel != 4){
            if (enemies.length == 0){
                doors[0].createDoor()
            }
            // Door collision to pass level
            if (doors.length > 0 && enemies.length == 0){
                if (rectangleColision(player, doors) != null){
                    doors[0].passLevel(this.currentLevel);

                    const door = new Music()
                    door.changeInd(3)
                    door.playSong()
                }
                doors[0].update();
                
            }
        }
        

        // ------------------------------------------------------

        // Heal

        let collidedHeal = rectangleColision(player, heals); // checks collision between player and heals
        if (collidedHeal != null) {
            player.collided(heals[collidedHeal]);
            heals[collidedHeal].collided(player);
        }
        for (let i=0; i<heals.length;i++){
            if (heals[i].isCollected) {
                heals.splice(i, 1);
                i--;
            }
            else {
                heals[i].update();
            }
        }

        // ------------------------------------------------------

        // Player
    
        let playerEnemyCollision = rectangleColision(player, enemies); // checks collision between player and enemies
        if (playerEnemyCollision != null) {
            player.collided(enemies[playerEnemyCollision]);
            enemies[playerEnemyCollision].collided(player);
        }

        let whichLineCollided = rectangleColision(player, lines);
        if (whichLineCollided != null) {
            console.log("Colidiu com uma linha")
            player.collided(lines[whichLineCollided]);
        }
        
        if (this.currentLevel === 4){
            if (enemies[0] instanceof TonaldDrump){
                ctx.fillStyle = "red";
                ctx.font = "200px Arial";
                ctx.fillText("Drump rebaixado", 600, 900, 400);
        
                ctx.fillStyle = "blue";
                ctx.fillRect(300, 700, enemies[0].hp, 60);
            }
            else {
                ctx.fillStyle = "red";
                ctx.font = "200px Arial";
                ctx.fillText("Parabens, bagre!", 600, 900, 400);
            }
            
        }

        player.update();

        // ------------------------------------------------------
        // Credits
        for (let i = 0; i < components.credits.length; i++) {
            components.credits[i].update(); // updates the credits
            if (components.credits[i].remove) {
                components.credits.splice(i, 1); // removes the credit from the array
                i--;
            }
            let credit = rectangleColision(player, components.credits); // returns collided credit's index
            if (credit != null) {
                player.collided(components.credits[credit]);
                components.credits[credit].collided(player);
            }
        }
    
        // ------------------------------------------------------
        // scenery scrolling
        if (this.currentLevel != 0) {
            if (player.position.x > 850) { // scrolls the scenery to the left
                for (let i = 0; i < components.platforms.length; i++) {
                    components.platforms[i].position.x -= player.velocity.x;
                }
                for (let i = 0; i < components.enemies.length; i++) {
                    components.enemies[i].position.x -= player.velocity.x;
                }
                for (let i = 0; i < components.credits.length; i++) {
                    components.credits[i].position.x -= player.velocity.x;
                }
                for (let i = 0; i < components.heals.length; i++) {
                    components.heals[i].position.x -= player.velocity.x;
                }
                for (let i = 0; i < components.notes.length; i++) {
                    components.notes[i].position.x -= player.velocity.x;
                }
                for (let i = 0; i < components.doors.length; i++) {
                    components.doors[i].position.x -= player.velocity.x;
                }
                for (let i = 0; i < components.sticks.length; i++) {
                    components.sticks[i].position.x -= player.velocity.x;
                }

                this.totalDistance += player.velocity.x;
                player.position.x = 850;
            }
            else if (player.position.x < 450 && this.totalDistance > -100) {  // scrolling to the right
                for (let i = 0; i < components.platforms.length; i++) {
                    components.platforms[i].position.x += -player.velocity.x;
                }
                for (let i = 0; i < components.enemies.length; i++) {
                    components.enemies[i].position.x += -player.velocity.x;
                }
                for (let i = 0; i < components.credits.length; i++) {
                    components.credits[i].position.x += -player.velocity.x;
                }
                for (let i = 0; i < components.heals.length; i++) {
                    components.heals[i].position.x += -player.velocity.x;
                }
                for (let i = 0; i < components.notes.length; i++) {
                    components.notes[i].position.x += -player.velocity.x;
                }
                for (let i = 0; i < components.doors.length; i++) {
                    components.doors[i].position.x += -player.velocity.x;
                }
                for (let i = 0; i < components.sticks.length; i++) {
                    components.sticks[i].position.x += -player.velocity.x;
                }

                this.totalDistance += player.velocity.x;
                player.position.x = 450;
            }
            
            if (player.position.y < 200) {
                for (let i = 0; i < components.platforms.length; i++) { // scrolling down
                    components.platforms[i].position.y += -player.velocity.y;
                }
                for (let i = 0; i < components.enemies.length; i++) {
                    components.enemies[i].position.y += -player.velocity.y;
                }
                for (let i = 0; i < components.credits.length; i++) {
                    components.credits[i].position.y += -player.velocity.y;
                    components.credits[i].floatingHeight.min -= player.velocity.y;
                    components.credits[i].floatingHeight.max -= player.velocity.y;
                }
                for (let i = 0; i < components.heals.length; i++) {
                    components.heals[i].position.y += -player.velocity.y;
                }
                for (let i = 0; i < components.notes.length; i++) {
                    components.notes[i].position.y += -player.velocity.y;
                }
                for (let i = 0; i < components.doors.length; i++) {
                    components.doors[i].position.y += -player.velocity.y;
                }
                for (let i = 0; i < components.sticks.length; i++) {
                    components.sticks[i].position.y += -player.velocity.y;
                }

                this.deathZone -= player.velocity.y;
                this.totalDistanceY -= player.velocity.y;
                player.position.y = 200;
            }
            else if (player.position.y > 500 && this.totalDistanceY > 4) { // scrolling up
                for (let i = 0; i < components.platforms.length; i++) {
                    components.platforms[i].position.y -= player.velocity.y;
                }
                for (let i = 0; i < components.enemies.length; i++) {
                    components.enemies[i].position.y -= player.velocity.y;
                }
                for (let i = 0; i < components.credits.length; i++) {
                    components.credits[i].position.y -= player.velocity.y;
                    components.credits[i].floatingHeight.min -= player.velocity.y;
                    components.credits[i].floatingHeight.max -= player.velocity.y;
                }
                for (let i = 0; i < components.heals.length; i++) {
                    components.heals[i].position.y -= player.velocity.y;
                }
                for (let i = 0; i < components.notes.length; i++) {
                    components.notes[i].position.y -= player.velocity.y;
                }
                for (let i = 0; i < components.doors.length; i++) {
                    components.doors[i].position.y -= player.velocity.y;
                }
                for (let i = 0; i < components.sticks.length; i++) {
                    components.sticks[i].position.y -= player.velocity.y;
                }
                
                this.deathZone -= player.velocity.y;
                this.totalDistanceY -= player.velocity.y;
                player.position.y = 500;
            }

            if (this.totalDistanceY < 0) { // fixes the vertical scrolling bug
                for (let i = 0; i < components.platforms.length; i++) {
                    components.platforms[i].position.y -= this.totalDistanceY;
                }
                for (let i = 0; i < components.enemies.length; i++) {
                    components.enemies[i].position.y -= this.totalDistanceY;
                }
                for (let i = 0; i < components.credits.length; i++) {
                    components.credits[i].position.y -= this.totalDistanceY;
                    components.credits[i].floatingHeight.min -= this.totalDistanceY;
                    components.credits[i].floatingHeight.max -= this.totalDistanceY;
                }
                for (let i = 0; i < components.heals.length; i++) {
                    components.heals[i].position.y -= this.totalDistanceY;
                }
                for (let i = 0; i < components.notes.length; i++) {
                    components.notes[i].position.y -= this.totalDistanceY;
                }
                for (let i = 0; i < components.doors.length; i++) {
                    components.doors[i].position.y -= this.totalDistanceY;
                }
                for (let i = 0; i < components.sticks.length; i++) {
                    components.sticks[i].position.y -= this.totalDistanceY;
                }

                this.deathZone -= this.totalDistanceY;
                this.totalDistanceY = 0;
            }
        }
        
        else { // endless mode
            // draw wave number -> this.currentWave
            // display number of enemies left -> this.currentAmountOfEnemies
            ctx.font = "64px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(`Wave: ${this.currentWave}`, 1500, 110);
            ctx.fillText(`Enemies: ${this.currentAmountOfEnemies}`, 1500, 180);

            // next wave
            if (this.currentAmountOfEnemies == 0) {
                this.numberOfEnemies = Math.floor(Math.random() * 4 * this.currentWave/5) + 1; 
                for (let i=0; i<this.numberOfEnemies; i++){
                    let enemyType = Math.floor(Math.random() * 4);
                    let enemyXposition = player.position.x;
                    while (enemyXposition <= player.position2.x && enemyXposition + 100 >= player.position.x) {
                        enemyXposition = Number(Math.floor(Math.random() * 1700) + 100);
                    }
                    console.log(enemyXposition);
                    console.log(enemyType);
                    switch (enemyType) {
                        case 0: // bob
                            enemies.push(
                                new Bob(
                                    {x: enemyXposition, y: 500},
                                )
                            )
                            break;
                        case 1: // jorge
                            enemies.push(
                                new Jorge(
                                    {x: enemyXposition, y: 500},
                                )
                            )
                            break;
                        case 2: // robert
                            enemies.push(
                                new Robert(
                                    {x: enemyXposition, y: 500},
                                )
                            )
                            break;
                        case 3: // fred
                            enemies.push(
                                new Fred(
                                    {x: enemyXposition, y: 500},
                                )
                            )
                            break;
                    }
                }
                if (this.currentWave % 5 == 0) {
                    player.heal(20);
                }
                player.heal(20);
                this.currentWave++;
            }
            this.currentAmountOfEnemies = enemies.length;
        }
    }

    popHelpers = () => {
        for (let i=1; i<enemies.length; i++){
            enemies.pop()
        }
    }

    gameOver = () => {
        if (this.currentLevel === 4){
            this.popHelpers();
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.font = "50px Arial";
        if (player.socialCredits <= -50) {
            ctx.fillText("Game Over, causa de morte: dívida com governo chinês", 150, 200, 900);
        }
        else {
            ctx.fillText("Game Over", 800, 200, 300);
        }
        ctx.font = "20px Arial";
        this.firstLoadLevel = true;
        this.currentPage = "game over";
        ctx.fillStyle = "grey";
        ctx.fillText("Aperte 'Space' para continuar", 800, 400, 300);
        if (keys.jump.pressed) {
            this.firstLoadLevel = true;
            this.currentPage = "menu";
        }
        if (this.currentPage == "game over"){
            requestAnimationFrame(this.gameOver);
        }
    }

}
