const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = 1915; // set canvas to full window size
ctx.canvas.height = 928;

var mouseClickPosition = {
    x: 0,
    y:0
}
var currentPage = "menu"

const menus = new Menus(mouseClickPosition.x, mouseClickPosition.y)

const music = new Music();

const player = new Player({
    x: 600, 
    y: 0,
    imgSource: "./Assets/Ling-remodel.png"
}); // creates the player

var enemies = []  // creates enemy

var platforms = [];

var credits = [];

var doors = [];

var heals = [];

var notes = [];

var components = {};



function level1() {
    player.velocity = { // player velocity
        x: 0,
        y: 0
    }
    player.position.x = 600;
    player.position.y = 0;
    player.hp = 100;
    player.dead = false;
    player.socialCredits = 0;

    heals = [
        new Heal(850, 664)
    ];
    doors = [
       door = new Door({
        x:4300,
        y: 564
    })
    ];

    notes = [];
    
    enemies = [
        new Bob({
            x: 1200,
            y: 100
        }),
        new Jorge({
            x: 1400,
            y: 150
        })
    ]  // creates enemy
    
    platforms = [
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
            width: canvas.width + 2000, 
            height: 200
        }),
        floor2 = new Platform({
            x: canvas.width + 2100,
            y: canvas.height - 300,
            width: 1000,
            height: 300
        })
    ];
    credits = [
        new Credits({
            x: -100,
            y: 550
        }, "positive"),
    
        new Credits({
            x: 1120,
            y: 300
        }, "positive"),
    
        new Credits({
            x: 270,
            y: 100
        }, "positive"),
    ];
    components = {
        platforms: platforms,
        enemies: enemies,
        credits: credits,
        doors: doors,
        heals: heals,
        notes: notes
    }
}

function level2() {
    
    player.velocity = { // player velocity
        x: 0,
        y: 0
    }
    player.position.x = 600;
    player.position.y = 0;
    player.hp = 100;
    player.dead = false;
    player.socialCredits = 0;

    heals = [
        new Heal(850, 664)
    ];
    doors = [
       door = new Door({
        x: 300,
        y: 564
    })
    ];

    notes = [];

    enemies = [
        new Bob({
            x: 500,
            y: 300
        }),
        new Bob({
            x: 900,
            y: 500
        })
    ];

    platforms = [
        new Platform({
            x: 300,
            y: 400,
            width: 150,
            height: 50
        }),
        new Platform({
            x: 700,
            y: 300,
            width: 200,
            height: 50
        }),
        new Platform({
            x: 1000,
            y: 200,
            width: 100,
            height: 30
        }),
        new Platform({
            x: 0,
            y: canvas.height - 200,
            width: canvas.width,
            height: 200
        })
    ];

    credits = [
        new Credits({
            x: 350,
            y: 350
        }, "positive"),
        new Credits({
            x: 750,
            y: 250
        }, "positive"),
        new Credits({
            x: 1050,
            y: 150
        }, "positive")
    ];

    components = {
        platforms: platforms,
        enemies: enemies,
        credits: credits,
        doors: doors,
        heals: heals,
        notes: notes
    };
}

function level3() {
    player.velocity = { // player velocity
        x: 0,
        y: 0
    }
    player.position.x = 600;
    player.position.y = 0;
    player.hp = 100;
    player.dead = false;
    player.socialCredits = 0;

    heals = [
        new Heal(100, 700),
        new Heal(900, 500),
    ];
    doors = [
       door = new Door({
        x: 2000,
        y: 600
    })
    ];

    notes = [];

    enemies = [
        new Bob({
            x: 700,
            y: 500
        }),
        new Bob({
            x: 200,
            y: 300
        }),
        new Jorge({
            x: 1000,
            y: 100 
        })
    ];

    platforms = [
        new Platform({
            x: 300,
            y: 500,
            width: 240,
            height: 100
        }),
        new Platform({
            x: 700,
            y: 400,
            width: 200,
            height: 50
        }),
        new Platform({
            x: 1000,
            y: 200,
            width: 100,
            height: 30
        }),
        new Platform({
            x: 0,
            y: canvas.height - 200,
            width: canvas.width,
            height: 200
        })
    ];

    credits = [
        new Credits({
            x: 350,
            y: 350
        }, "positive"),
        new Credits({
            x: 750,
            y: 250
        }, "positive"),
        new Credits({
            x: 1050,
            y: 150
        }, "positive")
    ];

    components = {
        platforms: platforms,
        enemies: enemies,
        credits: credits,
        doors: doors,
        heals: heals,
        notes: notes
    };
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

function cutscesneInicial(){
    return;
}

//Game Loop
function animationLoop(){
        menus.updateMousePositions(mouseClickPosition.x, mouseClickPosition.y)
        currentPage = menus.getCurrentPage()
        switch(currentPage){
            case "menu":
                menus.menuLoop();
                break;

            case "game": 
                menus.playerLoop();
                break;
            case "lore": 
                menus.lorePage();
                break;
            case "commands": 
                menus.commandsPage();
                break;
        }
        mouseClickPosition.y = 0;
        mouseClickPosition.x = 0;

        requestAnimationFrame(animationLoop);

}
cutscesneInicial();
animationLoop(); // calls the game loop


// // check collision between two rectangles function
function rectangleColision(rect, rects) { // one element and array of elements
    for (let i=0; i<rects.length; i++) {
        if (rects[i].dead == true) { // no collision if enemy is dead and still in array
            continue;
        }
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

// ------------------------------------------------------

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
            enemies.push(new Bob({
                x: 1200,
                y: 100
            }, 200))   
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

