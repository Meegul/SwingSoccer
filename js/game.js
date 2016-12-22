let running = false; //Whether the game is being rendered
let started = false; //Whether the actual game is in progress
let objects = [];
let mapWidth = 0;
let mapHeight = 0;
let backgroundColor = "#000";
let startTime = 0;
let endTime = 10000;
let timeRemaining = 0;

function updateTime() {
    const timeNow = new Date().getTime();
    timeRemaining = endTime - timeNow;
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
        doPhysics();
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
