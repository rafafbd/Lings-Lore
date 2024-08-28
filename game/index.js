const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = innerWidth - 20; // set canvas to full window size
ctx.canvas.height = innerHeight - 20;

// instanciates objects
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
const gravity = 0.3;

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

// perpetual loop of the running game
function animationLoop() {
    requestAnimationFrame(animationLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);



    ctx.fillStyle = '#3b3b4f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "50px Times new Roman";
    ctx.fillStyle = "red";
    ctx.fillText("Ling's Lore", 800, 100);

    ctx.fillStyle = '#000000';
    for (let i = platforms.length - 1; i >= 0; i--){
        platforms[i].update();
    };

    for (let i = enemies.length - 1; i >= 0; i--){
        enemies[i].update();
        if (keys.attack.pressed) { // checks if the player is attacking
            switch (player.currentWeapon) { // different hitbox and damage based on current weapon
                case "fork":
                    if (player.looking.up || player.looking.down) { // vertical attack
                        // checks collision
                        if (Fork.position.x < enemies[i].position.x + enemies[i].width &&
                            Fork.position.x + Fork.attackRange.height > enemies[i].position.x &&
                            Fork.position.y < enemies[i].position.y + enemies.height &&
                            Fork.position.y + Fork.attackRange.width > enemies[i].position.y
                        )
                        enemies[i].takesDamage(Fork.damage);
                    }
                    else { // horizontal attack
                        if (Fork.position.x < enemies[i].position.x + enemies[i].width &&
                            Fork.position.x + Fork.attackRange.width > enemies[i].position.x &&
                            Fork.position.y < enemies[i].position.y + enemies.height &&
                            Fork.position.y + Fork.attackRange.height > enemies[i].position.y
                        )
                        enemies[i].takesDamage(Fork.damage);
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
   
    player.update(platforms);
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
