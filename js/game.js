let running = false; //Whether the game is being rendered
let started = false; //Whether the actual game is in progress
let objects = [];
let mapWidth = 0;
let mapHeight = 0;
let backgroundColor = "#000";
let startTime = 0;
let endTime = 10000;
let timeRemaining = 0;

//Use objects' velocities to move
function updateLocations() {
    objects.forEach((on) => {
        //Update locations
        on.x += on.dx;
        on.y += on.dy;

        //Resolve errors that would've occurred
        if (on.x + on.width > mapWidth) {
            on.x = mapWidth - on.width;
            on.dx = 0;
        }
        if (on.x - on.width < 0) {
            on.x = 0 + on.width;
            on.dx = 0;
        }
        if (on.y + on.height > mapHeight) {
            on.y = mapHeight - on.height;
            on.dy = 0;
        }
        if (on.y < 0) {
            on.y = 0;
            on.dy = 0;
        }
    });
}

function updateTime() {
    const timeNow = new Date().getTime();
    timeRemaining = endTime - timeNow;
}

//Resest all objects' locations to the origin
function resetLocations() {
    objects.forEach((on) => {
        on.x = on.x0;
        on.y = on.y0;
    });
}

//Set all objects' velocities to 0
function resetVelocities() {
    objects.forEach((on) => {
        on.dx = 0;
        on.dy = 0;
    });
}

//Checks to see what keys the user is pressing in order
//to determine what direction to move
function updateVelocities() {
    const friction = 0.86; //Speeds get slowed by .1 every frame
    const gravity = 1.2;
    let xChange = 0;
    let yChange = 0;
    if (keysDown[68]) //If d, increase speed right
        xChange += 2;
    if (keysDown[65]) //If a, increase speed left
        xChange -= 2;
    if (keysDown[87] && objects[0].y + objects[0].height === area.height) //If w && object on ground, jump
        yChange -= 25;

    //TESTING ANGLES
    if (keysDown[69])
        objects[0].angle++;
    if (keysDown[81])
        objects[0].angle--;


    //Calculates the new speeds
    objects[0].dx = objects[0].dx * friction + xChange;
    objects[0].dy = objects[0].dy + yChange + gravity;

    //Checks if the object is going too fast and
    //caps the speed, if necessary
    if (objects[0].dx > objects[0].dxMax)
        objects[0].dx = objects[0].dxMax;

    if (objects[0].dx < objects[0].dxMax * -1)
        objects[0].dx = objects[0].dxMax * -1;

    if (objects[0].dy > objects[0].dyMax)
        objects[0].dy = objects[0].dyMax;

    if (objects[0].dy < objects[0].dyMax * -1)
        objects[0].dy = objects[0].dyMax * -1;

    //If we're on the ground and didn't jump, have no vertical velocity
    if (yChange === 0 && objects[0].y + objects[0].height === area.height)
        objects[0].dy = 0;
}

function loadLevel(levelNumber) {
    running = false;

    switch (levelNumber) {
    case 0:
        mapWidth = level0.mapWidth;
        mapHeight = level0.mapHeight;
        backgroundColor = level0.backgroundColor;
        objects = level0.objects;
        break;
    default:
        break;
    }
    running = true;
}

function startGame() {
    const gameDuration = 60 * 1000; //60 seconds
    startTime = new Date().getTime();
    endTime = startTime + gameDuration;
}

//Debugging variables
const debug = true;
let startSecond = 0; //Used for FPS calc
let lastFrames = 0; //Frames last second
let frames = 0; //Frames this second
let frameStart = 0; //When a frame began
let frameEnd = 0; //When a frame ended

//Main game logic
const main = () => {
    if (running) {
        if (debug)
            frameStart = new Date().getTime();
        clear();
        drawAll();
        moveCamera();
        updateLocations();
        updateVelocities();
        updateTime();
        if (debug) {
            frameEnd = new Date().getTime();
            if (frameEnd - startSecond >= 1000) {
                lastFrames = frames;
                frames = 0;
                startSecond = frameEnd;
            }
            frames++;
            drawFrameTime(frameEnd - frameStart, lastFrames);
        }
        requestAnimationFrame(main);
    }
};

const resize = () => {
    const smallerDimension = (window.innerWidth < window.innerHeight) ? window.innerHeight : window.innerHeight;
    const canvas = document.getElementById("game");
    canvas.style.width = smallerDimension - 2;
    canvas.style.height = smallerDimension - 2;
};

const init = () => {
    resize();
    loadLevel(0);
    startGame();
    main();
};

window.onload = init;
window.onresize = resize;
