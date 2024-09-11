const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = 1920; // set canvas to full window size
ctx.canvas.height = 940;

var mouseClickPosition = {
    x: 0,
    y:0
}

const buttonX = new Image()
buttonX.src = "./Assets/pixil-frame-0.png"

const buttonPlay = new Image()
buttonPlay.src = "./Assets/botaoPlay.png"

const buttonLore = new Image()
buttonLore.src = "./Assets/botaoLore.png"

var textLore = "vuafgregvrfvrfevrffsb"

var currentPage = ""

var buttons = {
    playButton:{
        x:760,
        y:350,
        w:400,
        h:100
    },

    loreButton:{
        x:760,
        y:500,
        w:400,
        h:100
    },

    commandsButton:{
        x:760,
        y:650,
        w:400,
        h:100
    }
}

var commandArray = [
    {text:"W         - Mirar para cima", x:100, y:300, maxW: 1000 },
    {text:"A         - Mirar/Andar para esquerda", x:100, y:330, maxW: 1000 },
    {text:"S         - Mirar para baixo", x:100, y:360, maxW: 1000 },
    {text:"D         - Mirar/Andar para direita", x:100, y:390, maxW: 1000 },
    {text:"J         - Atacar", x:100, y:420, maxW: 1000 },
    {text:"K         - Dash", x:100, y:450, maxW: 1000 },
    {text:"Space - Pular", x:100, y:480, maxW: 1000 }
]
// instanciates objects

const music = new Music();



const player = new Player({
    x: 600, 
    y: 0,
    imgSource: "./Assets/Ling-remodel.png"
}); // creates the player

var enemies = []  // creates enemy

var platforms = [
    platform1 = new Platform({
        x: 800,
        y: 600,
        width: 200,
        height: 50
    }),
    platform2 = new Platform({
        x: 1100,
        y: 400,
        width: 100,
        height: 30
    }),
    platform3 = new Platform({
        x: 200,
        y: 200,
        width: 200,
        height: 300
    }),
    floor1 = new Platform({
        x: 0,
        y: canvas.height - 200,
        width: canvas.width, 
        height: 200
    })
];
var components = {
    platforms: platforms,
    enemies: enemies
}
    

// world constants
const gravity = 0.8;

// input related stuff
const keys = { // keys status (pressed or released)
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed: false
    },
    jump: {
        pressed: false
    },
    dash: {
        pressed: false
    },
    attack: {
        pressed: false
    }
}

//Game Loop
function animationLoop(){
    menuLoop()
    switch(currentPage){
        case "game": 
            playerLoop()
            break;
        case "lore": 
            lorePage()
            break;
        case "commands": 
            commandsPage()
            break;
    }
    mouseClickPosition.y = 0
    mouseClickPosition.x = 0

    requestAnimationFrame(animationLoop)
}

//Menu Pages
function commandsPage(){

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.font = "50px Arial"
    ctx.fillText("Ling's Lore", 150, 200, 300)
    ctx.font = "15px Arial"
    for (i = 0; i< 7 ; i++){
        ctx.fillText(commandArray[i].text,
                     commandArray[i].x, 
                     commandArray[i].y,
                     commandArray[i].maxW,

        )
    }
    /*------------      Back to menu button               --------------*/   
    ctx.drawImage(buttonX, 10, 10)

    if (mouseClickPosition.x >= 10 &&
        mouseClickPosition.x <= 50 &&
        mouseClickPosition.y >= 10 &&
        mouseClickPosition.y <= 50
    ){
        currentPage = "menu"
    }
    /*------------      Loop               --------------*/  
    if (currentPage == "commands"){
        requestAnimationFrame(commandsPage)
    }
    

}

function lorePage(){
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.font = "50px Arial"
    ctx.fillText("Ling's Lore", 150, 200, 300)
    ctx.font = "15px Arial"
    ctx.fillText(textLore, 150, 400, 300)   
    
    ctx.drawImage(buttonX, 10, 10)

    if (mouseClickPosition.x >= 10 &&
        mouseClickPosition.x <= 60 &&
        mouseClickPosition.y >= 10 &&
        mouseClickPosition.y <= 60
    ){
        currentPage = "menu"
    }

    if (currentPage == "lore"){
        requestAnimationFrame(lorePage)
    }
}

// Menu loop
function menuLoop(){
    ctx.clearRect(0, 0, 600, 800);

    ctx.font = "50px Arial";
    ctx.fillText("Ling's Lore", 830, 200, 300);
    
    ctx.drawImage(buttonPlay, buttons.playButton.x, buttons.playButton.y/* , buttons.playButton.w, buttons.playButton.h*/);
    
    ctx.drawImage(buttonLore, buttons.loreButton.x, buttons.loreButton.y/*, buttons.loreButton.w, buttons.loreButton.h */);
    
    ctx.fillRect(buttons.commandsButton.x, buttons.commandsButton.y, buttons.commandsButton.w, buttons.commandsButton.h);
    
    if (mouseClickPosition.x >= buttons.playButton.x &&
        mouseClickPosition.x <= buttons.playButton.x + buttons.playButton.w &&
        mouseClickPosition.y >= buttons.playButton.y &&
        mouseClickPosition.y <= buttons.playButton.y + buttons.playButton.h){
        currentPage = "game";
    }

    else if (mouseClickPosition.x >= buttons.loreButton.x &&
        mouseClickPosition.x <= buttons.loreButton.x + buttons.loreButton.w &&
        mouseClickPosition.y >= buttons.loreButton.y &&
        mouseClickPosition.y <= buttons.loreButton.y + buttons.loreButton.h){
        currentPage = "lore";
    }
    
    else if (mouseClickPosition.x >= buttons.commandsButton.x &&
        mouseClickPosition.x <= buttons.commandsButton.x + buttons.commandsButton.w &&
        mouseClickPosition.y >= buttons.commandsButton.y &&
        mouseClickPosition.y <= buttons.commandsButton.y + buttons.commandsButton.h){
        currentPage = "commands";
    }
    if (currentPage == ""){
        requestAnimationFrame(menuLoop);
    }
    
}
animationLoop(); // calls the game loop

// perpetual loop of the running game
function playerLoop() {
    requestAnimationFrame(playerLoop);
    //----------------------------------------------------------------
    //Teste parar musica
    if (player.position.y + player.height < canvas.height-200 && player.isOnFloor){
        music.stopAudio();
        

    }

    //----------------------------------------------------------------
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        // get diff between x/y from the two objects
        let axisDistances = {
            xDiff1: player.position.x - platforms[platform].position.x, // distance in x axis x1 - x1
            yDiff1: player.position.y - platforms[platform].position.y, // distance in y axis y1 - y1
            xDiff2: player.position2.x - platforms[platform].position2.x, // distance in y axis y1 - y2
            yDiff2: player.position2.y - platforms[platform].position2.y, // distance in y axis y1 - y2
        }

        // inside platform 
        
        if (axisDistances.xDiff1 > 0 && axisDistances.xDiff2 > 0 && axisDistances.yDiff1 < 0 && axisDistances.yDiff2 > 0) { // inside platform -- right of platform
            player.position.x = platforms[platform].position2.x;
            if (player.velocity.x < 0) {
                player.velocity.x *= -1;
            }
        }
        else if (axisDistances.xDiff1 < 0 && axisDistances.xDiff2 < 0 && axisDistances.yDiff1 < 0 && axisDistances.yDiff2 > 0){ // left of platform
            player.position.x = platforms[platform].position.x - player.width;
            if (player.velocity.x > 0) {
                player.velocity.x *= -1;
            }
        }

        // left or right of platform
        else if (axisDistances.xDiff1 > 0 && axisDistances.xDiff2 > -50 && axisDistances.yDiff1 > 0 && axisDistances.yDiff2 < player.height) { // right of platform
            player.position.x = platforms[platform].position2.x;
            if (player.velocity.x < 0) {
                player.velocity.x *= -1;
            }
        }
        else if (axisDistances.xDiff1 < 0 && axisDistances.xDiff2 < -50 && axisDistances.yDiff1 > 0 && axisDistances.yDiff2 < player.height){ // left of platform
            player.position.x = platforms[platform].position.x - player.width;
            if (player.velocity.x > 0) {
                player.velocity.x *= -1;
            }
        }

        // top or bottom
        else if (axisDistances.yDiff1 <= 0 && axisDistances.yDiff2 < 0){ // top of paltform
            player.isOnFloor = true;
            player.position.y = platforms[platform].position.y - player.height;
        }
        else if (axisDistances.yDiff1 >= 0 && axisDistances.yDiff2 > 0) { // under platform
            player.velocity.y = 0;
            player.position.y = platforms[platform].position2.y;
        }

    }
    else { // no collision detected
        player.isOnFloor = false;
    }

    // -----------------------------------------
    // enemy section down below

    for (let i = enemies.length - 1; i >= 0; i--){
        enemies[i].update();
        if (enemies[i].dead) {
            enemies.splice(i, 1);
        }
        // enemy collision with platforms
        platform = rectangleColision(enemies[i], platforms); // returns collided platform's index
        if (platform != null) {
            // get diff between x/y from the two objects
            let axisDistances = {
                xDiff1: enemies[i].position.x - platforms[platform].position.x, // distance in x axis x1 - x1
                yDiff1: enemies[i].position.y - platforms[platform].position.y, // distance in y axis y1 - y1
                xDiff2: enemies[i].position2.x - platforms[platform].position2.x, // distance in y axis y1 - y2
                yDiff2: enemies[i].position2.y - platforms[platform].position2.y, // distance in y axis y1 - y2
            }
            // left or right of platform
            if (axisDistances.xDiff1 > 0 && axisDistances.xDiff2 > 0 && axisDistances.yDiff1 > enemies[i].height - 20 && axisDistances.yDiff2 < enemies[i].height) { // right of platform
                enemies[i].position.x = platforms[platform].position2.x;
                if (enemies[i].velocity.x < 0) {
                    enemies[i].velocity.x *= -1;
                }
            }
            else if (axisDistances.xDiff1 < 0 && axisDistances.xDiff2 < 0 && axisDistances.yDiff1 > enemies[i].height - 20 && axisDistances.yDiff2 < enemies[i].height){ // left of platform
                enemies[i].position.x = platforms[platform].position.x - enemies[i].width;
                if (enemies[i].velocity.x > 0) {
                    playenemies[i].velocity.x *= -1;
                }
            }
            // top or bottom
            else if (axisDistances.yDiff1 <= 0 && axisDistances.yDiff2 < 0){ // top of paltform
                enemies[i].isOnFloor = true;
                enemies[i].position.y = platforms[platform].position.y - enemies[i].height;
            }
            else if (axisDistances.yDiff1 >= 0 && axisDistances.yDiff2 > 0) { // under platform
                enemies[i].velocity.y = 0;
                enemies[i].position.y = platforms[platform].position2.y;
            }
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

    /*if (player.isEndOfScreen.right === true){
        moveComponents("l");
    }
    else if (player.isEndOfScreen.left === true){
        moveComponents("r");
    }*/
   
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

// check collision between two rectangles function
function rectangleColision(rect, rects) { // one element and array of elements
    for (let i=0; i<rects.length; i++) {
        if (rect.position.x < rects[i].position2.x && rect.position2.x > rects[i].position.x && rect.position.y < rects[i].position2.y && rect.position2.y > rects[i].position.y) {
            return i; // returns index
        }
    }
    return null; // no collision
}

// checks collision for weapons
function weaponRectangleColision(rect, rects) { // one element and array of elements
    let enemiesAttacked = [];
    for (let i=0; i<rects.length; i++) {

        if (rect.attackCoordinates.x < rects[i].position2.x && rect.attackCoordinates.x + rect.attackRange.width > rects[i].position.x && rect.attackCoordinates.y < rects[i].position2.y && rect.attackCoordinates.y + rect.attackRange.height > rects[i].position.y) {
            enemiesAttacked.push(i);
        }
    }
    if (enemiesAttacked.length > 0) {
        return enemiesAttacked;
    }
    else {
        return null; // no collision
    }
}



// input listeners
addEventListener('keydown', ({ code }) => { // gets key pressed event
    switch (code) {
        case 'KeyD': 
            keys.right.pressed = true;
            break;
        
        case 'KeyA': 
            keys.left.pressed = true;
            break;
            
        case 'KeyW': 
            keys.up.pressed = true;
            break;

        case 'KeyS': 
            keys.down.pressed = true;
            break;

        case 'Space': 
            keys.jump.pressed = true;
            break;

        case 'KeyK':
            keys.dash.pressed = true;
            break;

        case 'KeyP':
            enemies.push(new Enemy({
                x: 800,
                y: 100,
                imgSource: "./Assets/fork3.png"
                
            }))
                        
            break;
        
        case 'KeyJ':
            keys.attack.pressed = true;
            break;
    }
})

addEventListener('keyup', ({ code }) => { // gets key released event
    switch (code) {
        case 'KeyD': 
            keys.right.pressed = false;
            break;
        
        case 'KeyA': 
            keys.left.pressed = false;
            break;
            
        case 'KeyW': 
            keys.up.pressed = false;
            break;

        case 'KeyS': 
            keys.down.pressed = false;
            break;

        case 'Space': 
            keys.jump.pressed = false;
            break;

        case 'KeyK':
            keys.dash.pressed = false;
            break;

        case 'KeyJ':
            keys.attack.pressed = false;
            break;
    }
})



addEventListener("keypress", function(){
    //console.log("Clicou")
    music.canPlay = true;
    music.tryPlayAudio()
        
})

addEventListener("mousedown", function(){
    //console.log("Mexeu")
    music.canPlay = true;
    music.tryPlayAudio()

})

music.audio.addEventListener("ended", function(){
    //console.log("acabou")
    music.changeSong(1)
    music.audio.play()
})

addEventListener("click", () => {
    document.onmousedown = function(e){
    mouseClickPosition.x = e.pageX;
    mouseClickPosition.y = e.pageY;
} })