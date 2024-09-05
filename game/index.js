const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = innerWidth - 20; // set canvas to full window size
ctx.canvas.height = innerHeight - 20;


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
        y: 100,
        width: 200,
        height: 500
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

function moveComponents(direction){ // Moves the whole screen, called when player is at border
    for (let i=0; i<components.length; i++){
        components[i].forEach(function(object) { // takes all the objects in the screen
            object.move(direction); // a method that all objects will need (still not working)
        })
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

// perpetual loop of the running game
function animationLoop() {
    
    //----------------------------------------------------------------
    //Teste parar musica
    //le.log(player.position.y + player.height)
    //console.log(canvas.height-200)
    if (player.position.y + player.height < canvas.height-200 && player.isOnFloor){
        music.stopAudio()
        

    }

    //----------------------------------------------------------------
    requestAnimationFrame(animationLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#3b3b4f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "50px Times new Roman";
    ctx.fillStyle = "red";
    ctx.fillText("Ling's Lore", 800, 100);

    // updates and draws the platforms
    ctx.fillStyle = '#000000';
    for (let i = platforms.length - 1; i >= 0; i--){ 
        platforms[i].update();
    }
    // checks collision between player and platforms
    let rectangle = rectangleColision(player, platforms); // returns collided platform's index
    if (rectangle != null) {
        player.isOnFloor = true;
        player.position.y = platforms[rectangle].position.y - player.height; // fixes position
    }
    else { // no collision detected
        player.isOnFloor = false;
    }

    for (let i = enemies.length - 1; i >= 0; i--){
        enemies[i].update();

        if (keys.attack.pressed) { // checks if the player is attacking
            switch (player.currentWeapon) { // different hitbox and damage based on current weapon
                case "fork":
                    if (player.looking.up || player.looking.down) { // vertical attack
                        // checks collision
                        
                    }
                    else { // horizontal attack

                    }
                    break;
            }
        }
    };

    /*if (player.isEndOfScreen.right === true){
        moveComponents("l");
    }
    else if (player.isEndOfScreen.left === true){
        moveComponents("r");
    }*/
   
    player.update();
}
animationLoop()

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
                y: 100
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
// var canplaythrough = false;
// audio.addEventListener('canplaythrough', function() { 
//     console.log("Entrou aqui")
//     canplaythrough = true;
//  }, false);

//  if (canplaythrough){
//     audio.play();
//  }

//  audio.addEventListener('ended', function(){
//     audio.play();
//  })

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