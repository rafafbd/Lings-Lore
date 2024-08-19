import { Player } from "./player.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const Player = new Player(100, 100, ctx); // creates the player=

// world constants
const gravity = 2;

// game
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


function animationLoop() {
    requestAnimationFrame(animationLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#3b3b4f';
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    Player.update(keys, gravity)
}
animationLoop()

addEventListener('keydown', ({ code }) => { // gets key pressed event
    switch (code) {
        case 'KeyD': // key 'D'
            keys.right.pressed = true;
            break;
        
        case 'KeyA': // key 'A'
            keys.left.pressed = true;
            break;
            
        case 'KeyW': // key 'W'
            keys.up.pressed = true;
            break;

        case 'KeyS': // key 'S'
            keys.down.pressed = true;
            break;

        case 'Space': // key 'Space'
            keys.jump.pressed = true;
            break;
    }
})

addEventListener('keyup', ({ code }) => { // gets key released event
    switch (code) {
        case 'KeyD': // key 'D'
            keys.right.pressed = false;
            break;
        
        case 'KeyA': // key 'A'
            keys.left.pressed = false;
            break;
            
        case 'KeyW': // key 'W'
            keys.up.pressed = false;
            break;

        case 'KeyS': // key 'S'
            keys.down.pressed = false;
            break;

        case 'Space': // key 'Space'
            keys.jump.pressed = false;
            break;
    }
})


