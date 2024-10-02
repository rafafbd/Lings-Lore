const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = 1915; // set canvas to full window size
ctx.canvas.height = 928;

var mouseClickPosition = {
    x: 0,
    y:0
}
var currentPage = "menu"
var canPlayMusics = true

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
    player.chopsticks.ammo = 2;

    heals = [
        new Heal(850, 664),
        new Heal(8900, 664),
    ];
    doors = [
       door1 = new Door({
        x: 10534,
        y: 372,
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
        }),
        new Robert ({
            x: 2700,
            y: 200,
        }),
        new Bob ({
            x: 7000,
            y: 400
        }),
        new Robert ({
            x: 8575,
            y: 200
        }),
        new Jorge ({
            x: 9500,
            y: 100
        }),
        new Bob ({
            x: 9200,
            y: 100
        }),
        new Bob ({
            x: 3850,
            y: 100
        }),
        
    ]  // creates enemy
    
    platforms = [
        floor1 = new Platform({
            x: 0,
            y: 750,
            width: 2000, 
            height: 200
        }),
        middlePlatformInStart = new Platform({
            x: 800,
            y: 600,
            width: 200,
            height: 50
        }),
        rightOfMiddlePlatformInStart = new Platform({
            x: 1100,
            y: 400,
            width: 100,
            height: 30
        }),
        largePlatformInLeftOfStart = new Platform({
            x: 200,
            y: 240,
            width: 200,
            height: 300
        }),
        lowerLeftSecondBatch = new Platform({
            x: 2400,
            y: 500,
            width: 200, 
            height: 50
        }),
        lowerRightSecondBatch = new Platform({
            x: 2800,
            y: 500,
            width: 200,
            height: 50
        }),
        middlePlatformSecondBatch = new Platform({
            x: 2550,
            y: 300,
            width: 300,
            height: 50
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
        platformOnTopOfFloor3 = new Platform({
            x: 3750,
            y: 450,
            width: 200,
            height: 70
        }),
        platformNextToFloor3 = new Platform({
            x: 4600,
            y: 530,
            width: 150,
            height: 70
        }),
        floating1 = new Platform({
            x: 4900,
            y: 380,
            width: 150,
            height: 70
        }),
        floating2 = new Platform({
            x: 5200,
            y: 230,
            width: 150,
            height: 70
        }),
        floating3 = new Platform({
            x: 5500,
            y: 380,
            width: 150,
            height: 70
        }),
        floating4 = new Platform({
            x: 5800,
            y: 530,
            width: 150,
            height: 70
        }),
        floor4 = new Platform({
            x: 5600,
            y: 700,
            width: 900,
            height: 500
        }),
        floor5 = new Platform({
            x: 6700,
            y: 640,
            width: 800,
            height: 500
        }),
        wall1 = new Platform({
            x: 7800,
            y: 50,
            width: 100,
            height: 600
        }),
        floor6 = new Platform({
            x: 8200,
            y: 850,
            width: 800,
            height: 500
        }),
        ladder1 = new Platform({
            x: 8300,
            y: 700,
            width: 150,
            height: 50
        }),
        ladder2 = new Platform({
            x: 8600,
            y: 500,
            width: 150,
            height: 50
        }),
        ladder3 = new Platform({
            x: 8300,
            y: 300,
            width: 150,
            height: 50
        }),
        ladder4 = new Platform({
            x: 8600,
            y: 100,
            width: 150,
            height: 50
        }),
        floor7 = new Platform({
            x: 9000,
            y: 200,
            width: 1000,
            height: 200
        }),
        floor8 = new Platform({
            x: 10300,
            y: 500,
            width: 500,
            height: 100
        }),
        platformOnTopOfFloor8 = new Platform({
            x: 10500,
            y: 300,
            width: 100,
            height: 50
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
        new Credits({
            x: 7810,
            y: -10
        }, "positive"),
        new Credits({
            x: 7810,
            y: -25
        }, "positive"),
        new Credits({
            x: 8630 ,
            y: 50
        }, "positive"),
        new Credits({
            x: 6570,
            y: 500
        }, "negative"),
        new Credits({
            x: 6700,
            y: 450
        }, "negative"),
        new Credits({
            x: 6830,
            y: 400
        }, "negative"),
        new Credits({
            x: 8600,
            y: 300
        }, "negative"),
        new Credits({
            x: 3825,
            y: 580
        }, "negative"),
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
    player.chopsticks.ammo = 2;

    heals = [
        new Heal(850, 664),
        new Heal(1600, 0)
    ];
    doors = [
       door = new Door({
        x: 3393,
        y: -1628,
        currentLevel: 2
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
        }),
        new Jorge ({
            x: 350,
            y: 0
        }),
        new Robert ({
            x: 1400,
            y: -340,
        }),
        new Robert ({
            x: 2100,
            y: -500,
        }),
        new Bob ({
            x: 2780,
            y: -790,
        }),
        new Robert ({
            x: 3900,
            y: -1400,
        }),
    ];

    platforms = [
        up1 = new Platform({
            x: 300,
            y: 500,
            width: 150,
            height: 50
        }),
        up2 = new Platform({
            x: 700,
            y: 400,
            width: 200,
            height: 50
        }),
        up3 = new Platform({
            x: 1000,
            y: 240,
            width: 100,
            height: 50
        }),
        up4 = new Platform({
            x: 300,
            y: 100,
            width: 400,
            height: 75
        }),
        up5 = new Platform({
            x: 1300,
            y: 100,
            width: 400,
            height: 75
        }),
        up6 = new Platform({
            x: 1000,
            y: -110,
            width: 100,
            height: 50
        }),
        up7 = new Platform({
            x: 1300,
            y: -250,
            width: 400,
            height: 75
        }),
        up8 = new Platform({
            x: 2000,
            y: -410,
            width: 300,
            height: 60
        }),
        up9 = new Platform({
            x: 2000,
            y: -630,
            width: 300,
            height: 60
        }),
        up10 = new Platform({
            x: 2700,
            y: -750,
            width: 500,
            height: 70
        }),
        up11 = new Platform({
            x: 3350,
            y: -600,
            width: 400,
            height: 50
        }),
        wall1 = new Platform ({
            x: 3900,
            y: -1300,
            width: 100,
            height: 300
        }),
        wall2 = new Platform ({
            x: 3900,
            y: -750,
            width: 100,
            height: 300
        }),
        up12 = new Platform({
            x: 4100,
            y: -900,
            width: 100,
            height: 50
        }),
        up13 = new Platform({
            x: 4100,
            y: -1110,
            width: 100,
            height: 50
        }),
        up14 = new Platform({
            x: 3150,
            y: -1500,
            width: 550,
            height: 100
        }),
        floor1 = new Platform({
            x: 0,
            y: 700,
            width: 2000,
            height: 400
        }),

    ];

    credits = [
        new Credits({
            x: 350,
            y: 350
        }, "positive"),
        new Credits({
            x: 750,
            y: 250
        }, "negative"),
        new Credits({
            x: 1050,
            y: 150
        }, "positive"),
        new Credits ({
            x: 425,
            y: 25,
        }, "positive"),
        new Credits ({
            x: 1425,
            y: 25,
        }, "negative"),
        new Credits ({
            x: 1500,
            y: 600,
        }, "positive"),
        new Credits ({
            x: 1350,
            y: -300,
        }, "negative"),
        new Credits ({
            x: 3400,
            y: -750,
        }, "negative"),
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
        new Heal(100, 600),
        new Heal(900, 500),
    ];
    doors = [
        new Door({
            x: 3800,
            y: 672,
            currentLevel: 3
    })
    ];

    notes = [];
    sticks = [];

    enemies = [
        new Bob({
            x: 1000,
            y: 500
        }),
        new Bob({
            x: 200,
            y: 300
        }),
        new Jorge({
            x: 1000,
            y: 100 
        }),
        new Robert({
            x: 300,
            y: 200
        }),
        new Robert({
            x: 1300,
            y: 200
        }),
        new Robert({
            x: 2600,
            y: 400
        }),
        new Jorge ({
            x: 3300,
            y: 400
        })
    ];

    platforms = [
        up1 = new Platform({
            x: 300,
            y: 540,
            width: 240,
            height: 60
        }),
        up2 = new Platform({
            x: 700,
            y: 400,
            width: 200,
            height: 50
        }),
        up3 = new Platform({
            x: 1000,
            y: 220,
            width: 100,
            height: 30
        }),
        floor1 = new Platform({
            x: 0,
            y: 700,
            width: 1600,
            height: 300
        }),
        floor2 = new Platform({
            x: 1900,
            y: 580,
            width: 400,
            height: 500
        }),
        floor3 = new Platform({
            x: 2500,
            y: 500,
            width: 400,
            height: 500
        }),
        floor4 = new Platform({
            x: 3100,
            y: 420,
            width: 400,
            height: 500
        }),
        floor5 = new Platform({
            x: 3700,
            y: 340,
            width: 450,
            height: 300
        }),
        floor6 = new Platform({
            x: 3700,
            y: 800,
            width: 450,
            height: 150
        }),
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
        }, "positive"),
        new Credits ({
            x: 2100,
            y: 500,
        }, "negative"),
        new Credits ({
            x: 2650,
            y: 400,
        }, "negative"),
        new Credits ({
            x: 3930,
            y: 300
        }, "negative"),
        new Credits ({
            x: 4040,
            y: 300
        }, "negative"),
        new Credits ({
            x: 3820,
            y: 300
        }, "negative"),
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
    player.chopsticks.ammo = 2;

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
    },
    mute: {
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
        if (rects[i].dead) { // no collision if enemy is dead and still in array
            continue;
        }
        else if (rect.position.x < rects[i].position2.x &&  
            rect.position2.x > rects[i].position.x && 
            rect.position.y < rects[i].position2.y &&
             rect.position2.y > rects[i].position.y) {
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
            break;
        case 'KeyM':
            keys.mute.pressed = true
            music.changeState()
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
        
        case 'KeyM':
            keys.mute.pressed = false;
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
    music.nextSong()
    music.playNextBackground()
})

addEventListener("click", () => {
    document.onmousedown = function(e){
    mouseClickPosition.x = e.pageX;
    mouseClickPosition.y = e.pageY;
} })

