import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth - 20; // set canvas to full window size
ctx.canvas.height = window.innerHeight - 20;

const player = new Player(100, 100, "./Assets/Ling-Prototipo.png"); // creates the player
export default player;
const enemy = new Enemy(800, 100, player); // creates enemy

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
    }
}

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
    }
})

// perpetual loop of the running game
function animationLoop() {
    requestAnimationFrame(animationLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);



    ctx.fillStyle = '#3b3b4f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 520, canvas.width, canvas.height - 520);

    ctx.font = "50px Times new Roman";
    ctx.fillStyle = "red";
    ctx.fillText("Ling's Lore", 800, 100);

    player.update(keys, gravity)
    enemy.update(gravity)
}
animationLoop()
