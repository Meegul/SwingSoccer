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
    let levelToLoad;

    switch (levelNumber) {
    case 0:
        levelToLoad = level0;
        break;
    default:
        break;
    }

    if (levelToLoad) {
        mapWidth = levelToLoad.mapWidth;
        mapHeight = levelToLoad.mapHeight;
        backgroundColor = levelToLoad.backgroundColor;
        objects = levelToLoad.objects;
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
let lastFrameEnd = 0; //When the last frame ended
let lastFrames = 0; //Frames last second
let frames = 0; //Frames this second
let timeSinceLastFrame = 0; //Time in between frames
let totalTimeToRender = 0; //Time in between frames + render time
let maxTotalTime = 0;
function debugData(timeStart, timeEnd) {
    if (timeEnd - startSecond >= 1000) { //Collect frames for a second
        lastFrames = frames;
        frames = 0;
        startSecond = timeEnd;
        maxTotalTime = totalTimeToRender;
    }
    frames++;
    timeSinceLastFrame = timeStart - lastFrameEnd;
    totalTimeToRender = timeEnd - lastFrameEnd;
    if (maxTotalTime < totalTimeToRender) {
        maxTotalTime = totalTimeToRender;
    }
    lastFrameEnd = timeEnd;
    drawFrameTime(timeEnd - timeStart, lastFrames, timeSinceLastFrame, totalTimeToRender, maxTotalTime);
}

//Main game logic
const main = () => {
    if (running) {
        const frameStart = new Date().getTime();
        clear();
        drawAll();
        moveCamera();
        doPhysics();
        updateTime();
        const frameEnd = new Date().getTime();
        if (debug) {
            debugData(frameStart, frameEnd);
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
