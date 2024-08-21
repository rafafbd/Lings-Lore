import { Player } from "./player/player.js";
import { Enemy } from "./enemies/enemy.js";
import { Platform } from "./objects/platform.js";

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
ctx.canvas.width = innerWidth - 20; // set canvas to full window size
ctx.canvas.height = innerHeight - 20;

// instanciates objects
const player = new Player(100, 100, "./Assets/Ling-Prototipo.png"); // creates the player
export default player;
const enemy = new Enemy(800, 100, player); // creates enemy

var platforms = {
    floor1: new Platform(0, innerHeight - 200, innerWidth, 200)
};

// world constants
const gravity = 0.5;

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
    }
}

// perpetual loop of the running game
function animationLoop() {
    requestAnimationFrame(animationLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);



    ctx.fillStyle = '#3b3b4f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000'
    platforms.floor1.update()

    ctx.font = "50px Times new Roman";
    ctx.fillStyle = "red";
    ctx.fillText("Ling's Lore", 800, 100);

    player.update(keys, gravity)
    enemy.update(gravity)
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
    }
})
