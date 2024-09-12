class Menus {
    constructor(xMouse, yMouse) {

        this.mouseClickPosition = {
            x: xMouse,
            y: yMouse
        };

        const background = new Image();
        background.src = "/Assets/Background-original.png";
        this.backGround = background;

        this.buttonX = new Image();
        this.buttonX.src = "./Assets/pixil-frame-0.png";
        this.buttonPlay = new Image();
        this.buttonPlay.src = "./Assets/botaoPlay.png";
        this.buttonLore = new Image();
        this.buttonLore.src = "./Assets/botaoLore.png";
        this.buttonCommands = new Image();
        this.buttonCommands.src = "./Assets/botaoCommands.png";

        this.textLore = "vuafgregvrfvrfevrffsb";
        this.currentPage = "menu";

        this.buttons = {
            playButton: {
                x: (canvas.width-this.buttonPlay.width)/2,
                y: 350,
                w: 400,
                h: 100
            },
            loreButton: {
                x: (canvas.width-this.buttonLore.width)/2,
                y: 500,
                w: 400,
                h: 100
            },
            commandsButton: {
                x: (canvas.width-this.buttonCommands.width)/2,
                y: 650,
                w: 400,
                h: 100
            }
        };

        this.commandArray = [
            { text: "W         - Mirar para cima", x: 100, y: 300, maxW: 1000 },
            { text: "A         - Mirar/Andar para esquerda", x: 100, y: 330, maxW: 1000 },
            { text: "S         - Mirar para baixo", x: 100, y: 360, maxW: 1000 },
            { text: "D         - Mirar/Andar para direita", x: 100, y: 390, maxW: 1000 },
            { text: "J         - Atacar", x: 100, y: 420, maxW: 1000 },
            { text: "K         - Dash", x: 100, y: 450, maxW: 1000 },
            { text: "Space - Pular", x: 100, y: 480, maxW: 1000 }
        ];

        // Ensure ctx is available globally or passed in as needed
    }

    getCurrentPage = () => {
        return this.currentPage
    }

    updateMousePositions = (xMouse, yMouse) => {
        this.mouseClickPosition.x = xMouse
        this.mouseClickPosition.y = yMouse
    }

    menuLoop = () => {
        ctx.clearRect(0, 0, 600, 800);
    
        ctx.font = "50px Arial"
        ctx.fillText("Ling's Lore", 830, 200, 300)
    
        
        
        ctx.drawImage(this.buttonPlay, this.buttons.playButton.x, this.buttons.playButton.y/* , this.buttons.playButton.w, this.buttons.playButton.h*/);
        
        ctx.drawImage(this.buttonLore, this.buttons.loreButton.x, this.buttons.loreButton.y/*, this.buttons.loreButton.w, this.buttons.loreButton.h */);
        
        ctx.drawImage(this.buttonCommands, this.buttons.commandsButton.x, this.buttons.commandsButton.y/*, this.buttons.commandsButton.w, this.buttons.commandsButton.h */);
        
        if (this.mouseClickPosition.x >= this.buttons.playButton.x &&
            this.mouseClickPosition.x <= this.buttons.playButton.x + this.buttons.playButton.w &&
            this.mouseClickPosition.y >= this.buttons.playButton.y &&
            this.mouseClickPosition.y <= this.buttons.playButton.y + this.buttons.playButton.h){
            this.currentPage = "game";
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

    commandsPage = () => {

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "50px Arial";
        ctx.fillText("Ling's Lore", 150, 200, 300);
        ctx.font = "15px Arial"
        for (let i = 0; i< 7 ; i++){
            ctx.fillText(this.commandArray[i].text,
                         this.commandArray[i].x, 
                         this.commandArray[i].y,
                         this.commandArray[i].maxW,
    
            )
        }
        /*------------      Back to menu button     --------------*/   
        ctx.drawImage(this.buttonX, 10, 10)
    
        if (this.mouseClickPosition.x >= 10 &&
            this.mouseClickPosition.x <= 50 &&
            this.mouseClickPosition.y >= 10 &&
            this.mouseClickPosition.y <= 50
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
        ctx.font = "50px Arial";
        ctx.fillText("Ling's Lore", 150, 200, 300);
        ctx.font = "15px Arial";
        ctx.fillText(this.textLore, 150, 400, 300);
        
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

    playerLoop = () => {
    
        //----------------------------------------------------------------
        //Teste parar musica
        if (player.position.y + player.height < canvas.height-200 && player.isOnFloor){
            music.stopAudio();
        }
        //----------------------------------------------------------------

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /*ctx.drawImage(this.backGround,
            0,
            0,
            canvas.width,
            canvas.height);*/

        ctx.fillStyle = '#3b3b4f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        ctx.font = "50px Times new Roman";
        ctx.fillStyle = "red";
        ctx.fillText("Ling's Lore", 800, 100);


    
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
            if (enemies[i].dead) {
                let deadEnemy = i;
                setTimeout (() => {
                    enemies.splice(deadEnemy, 1);
                }, 0);   
            }
            // enemy collision with platforms
            platform = rectangleColision(enemies[i], platforms); // returns collided platform's index
            if (platform != null) {
                enemies[i].collided(platforms[platform]);
            }
            else { // no collision detected
                enemies[i].isOnFloor = false;
            }
        };
    
        if (keys.attack.pressed) { // checks if the player is attacking
            switch (player.currentWeapon) { // different hitbox and damage based on current weapon
                case "fork":
                    let enemy = weaponRectangleColision(player.fork, enemies); // returns list of enemies hit
                    if (enemy != null) {
                        for (let j = 0; j<enemy.length; j++) {
                            player.fork.collided(enemies[enemy[j]]);
                            enemies[enemy[j]].collided(player.fork);
                        }
                    }
            }
        }
    
        // ------------------------------------------------------
        // Player collision with enemies
    
        let playerEnemyCollision = rectangleColision(player, enemies); // checks collision between player and enemies
        if (playerEnemyCollision != null) {
            player.collided(enemies[playerEnemyCollision]);
            enemies[playerEnemyCollision].collided(player);
        }
       
        player.update();
    
    
        // ------------------------------------------------------
        // scenery scrolling
        if (player.position.x > 850) {
            for (let i = 0; i < components.platforms.length; i++) {
                components.platforms[i].position.x -= player.velocity.x;
            }
            for (let i = 0; i < components.enemies.length; i++) {
                components.enemies[i].position.x -= player.velocity.x;
            }
            player.position.x = 850;
        }
        else if (player.position.x < 450) { 
            for (let i = 0; i < components.platforms.length; i++) {
                components.platforms[i].position.x += -player.velocity.x;
            }
            for (let i = 0; i < components.enemies.length; i++) {
                components.enemies[i].position.x += -player.velocity.x;
            }
            player.position.x = 450;
        }
    
    }

}
