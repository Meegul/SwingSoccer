let running = false;
const objects = [];
const mapWidth = 2000;
const mapHeight = 1000;

objects[0] = { //Stick figure
    x0: 500,
    y0: 500,
    x: 500,
    y: 500,
    dx: 0,
    dy: 0,
    dxMax: 10,
    dyMax: 40,
    lines: [{
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 100,
        color: "#FF0000",
    }, {
        x0: 0,
        y0: 100,
        x1: -50,
        y1: 150,
    }, {
        x0: 0,
        y0: 100,
        x1: 50,
        y1: 150,
    }, {
        x0: 0,
        y0: 20,
        x1: -50,
        y1: 20,
    }, {
        x0: 0,
        y0: 20,
        x1: 50,
        y1: 20,
    }],
    circles: [{
        x0: 0,
        y0: -50,
        radius: 50,
        color: "#FF0000",
        fill: true,
    }],
    height: 150,
    width: 50,
    angle: 0,
};

objects[1] = { //Border
    x0: 0,
    y0: 0,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    dxMax: 0,
    dyMax: 0,
    lines: [{
        x0: 0,
        y0: 0,
        x1: 2000,
        y1: 0,
    }, {
        x0: 2000,
        y0: 0,
        x1: 2000,
        y1: 1000,
    }, {
        x0: 2000,
        y0: 1000,
        x1: 0,
        y1: 1000,
    }, {
        x0: 0,
        y0: 1000,
        x1: 0,
        y1: 0,
    }],
    height: 0,
    width: 0,
    angle: 0,
};

//Use objects' velocities to move
function updateLocations() {
    objects.forEach((on) => {
        //Update locations
        on.x += on.dx;
        on.y += on.dy;

        //Resolve errors that would've occurred
        /*if (on.x + on.width > area.width) {
            on.x = area.width - on.width;
            on.dx = 0;
        }
        if (on.x - on.width < 0) {
            on.x = 0 + on.width;
            on.dx = 0;
        }*/
        if (on.y + on.height > area.height) {
            on.y = area.height - on.height;
            on.dy = 0;
        }
        if (on.y < 0) {
            on.y = 0;
            on.dy = 0;
        }
    });
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

//Main game logic
const main = () => {
    if (running) {
        clear();
        drawAll();
        moveCamera();
        updateLocations();
        updateVelocities();
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
    running = true;
    main();
};

window.onload = init;
window.onresize = resize;
