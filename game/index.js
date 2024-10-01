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
    y: 0
}); // creates the player

var enemies = []  // creates enemy

var platforms = [];

var credits = [];

var doors = [];

var heals = [];

var notes = [];

var sticks = [];

var lines = [];

var components = {};

function endless() {
    player.velocity = { // player velocity
        x: 0,
        y: 0
    }
    player.position.x = 600;
    player.position.y = 500;
    player.hp = 100;
    player.dead = false;
    player.socialCredits = 0;

    heals = [];
    doors = [];
    notes = [];
    sticks = [];

    enemies = [];

    platforms = [
        new Platform({
            x: 0,
            y: 700,
            width: 2000,
            height: 400
        }),
        new Platform({
            x: 200,
            y: 500,
            width: 200,
            height: 40
        }),
        new Platform({
            x: 600,
            y: 300,
            width: 250,
            height: 40
        }),
        new Platform({
            x: 1000,
            y: 500,
            width: 200,
            height: 40
        }),
        new Platform({
            x: 1400,
            y: 300,
            width: 200,
            height: 40
        }),
    ];

    credits = [];

    components = {
        platforms: platforms,
        enemies: enemies,
        credits: credits,
        doors: doors,
        heals: heals,
        notes: notes,
        sticks: sticks
    };
} 

function level1() {
    player.velocity = { // player velocity
        x: 0,
        y: 0
    }
    player.position.x = 600;
    player.position.y = 500;
    player.hp = 100;
    player.dead = false;
    player.socialCredits = 0;

    heals = [
        new Heal(850, 664)
    ];
    doors = [
       door = new Door({
        x:4300,
        y: 564,
        currentLevel: 1,
    })
    ];

    notes = [];
    sticks = [];
    
    enemies = [
        new Jorge ({
            x: 5850,
            y: 100
        }),
        new Jorge ({
            x: 5550,
            y: 100
        }),
        new Bob ({
            x: 300,
            y: 400
        }),
        new Robert ({
            x: 1000,
            y: 200
        })
    ]  // creates enemy
    
    platforms = [
        new Platform({
            x: 800,
            y: 600,
            width: 200,
            height: 50
        }),
        new Platform({
            x: 1100,
            y: 400,
            width: 100,
            height: 30
        }),
        new Platform({
            x: 200,
            y: 240,
            width: 200,
            height: 300
        }),
        new Platform({
            x: 2400,
            y: 500,
            width: 600, 
            height: 50
        }),
        new Platform({
            x: 2550,
            y: 300,
            width: 300,
            height: 50
        }),
        floor1 = new Platform({
            x: 0,
            y: 750,
            width: 2000, 
            height: 200
        }),
        floor2 = new Platform({
            x: 2200,
            y: 700,
            width: 1000,
            height: 500
        }),
        floor3 = new Platform({
            x: 3500,
            y: 640,
            width: 800,
            height: 500
        }),
        platformNextToFloor3 = new Platform({
            x: 4600,
            y: 530,
            width: 150,
            height: 70
        }),
        new Platform({
            x: 4900,
            y: 380,
            width: 150,
            height: 70
        }),
        new Platform({
            x: 5200,
            y: 230,
            width: 150,
            height: 70
        }),
        new Platform({
            x: 5500,
            y: 380,
            width: 150,
            height: 70
        }),
        new Platform({
            x: 5800,
            y: 530,
            width: 150,
            height: 70
        }),
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
        new Credits({
            x: 2500,
            y: 430
        }, "positive"),
        new Credits({
            x: 2850,
            y: 430
        }, "positive"),
        new Credits({
            x: 2650,
            y: 220
        }, "positive"),
        new Credits({
            x: 4950,
            y: 330
        }, "positive"),
        new Credits({
            x: 5250,
            y: 180
        }, "positive"),
    ];
    components = {
        platforms: platforms,
        enemies: enemies,
        credits: credits,
        doors: doors,
        heals: heals,
        notes: notes,
        sticks: sticks
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
        y: 564,
        currentLevel: 2,
    })
    ];

    notes = [];
    sticks = [];

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
        notes: notes,
        sticks: sticks
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
        new Door({
            x: 2000,
            y: 600,
            currentLevel: 3
    })
    ];

    notes = [];
    sticks = [];

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
        notes: notes,
        sticks: sticks
    };
}

function level4(){ // boss level
    player.velocity = { // player velocity
        x: 0,
        y: 0
    };
    player.position.x = 600;
    player.position.y = 0;
    player.hp = 100;
    player.dead = false;
    player.socialCredits = 0;

    platforms = [
        new Platform({x: 0, y: 700, width: 2000, height: 500}),
        new Platform({x: 500, y: 500, width: 200, height: 40}),
        new Platform({x: 1200, y: 500, width: 200, height: 40})
    ];

    enemies = [
        new TonaldDrump(1000, 200)
    ];

    components = {
        platforms: platforms,
        enemies: enemies,
        credits: credits,
        doors: doors,
        heals: heals,
        notes: notes,
        sticks: sticks
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
    },
    shoot: {
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

            case "selectGamemode": 
                menus.chooseGamemode();
                break;
            case "lore": 
                menus.lorePage();
                break;
            case "commands": 
                menus.commandsPage();
                break;
            case "career":
                menus.playerLoop();
                break;
            case "endless":
                menus.currentLevel = 0
                menus.playerLoop();
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
        
        case 'KeyJ':
            keys.attack.pressed = true;
            break;

        case 'Digit1':
            player.fork.isEquipped = true;
            player.chopsticks.isEquipped = false;
            player.currentWeapon = "fork";
            break;
        case 'Digit2':
            player.chopsticks.isEquipped = true;
            player.fork.isEquipped = false;
            player.currentWeapon = "chopsticks";
            break;
        case 'KeyI':
            if (player.fork.isEquipped){
                player.chopsticks.isEquipped = true;
                player.fork.isEquipped = false;
                player.currentWeapon = "chopsticks";
            }
            else{
                player.fork.isEquipped = true;
                player.chopsticks.isEquipped = false;
                player.currentWeapon = "fork";
            }
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
            if (player.jumped) {
                player.velocity.y = 0;
            }
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
    music.netxSong()
    music.playNextBackground()
})

addEventListener("click", () => {
    document.onmousedown = function(e){
    mouseClickPosition.x = e.pageX;
    mouseClickPosition.y = e.pageY;
} })

