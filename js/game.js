let running = false;
const objects = [];

objects[0] = {
    x0: 100,
    y0: 100,
    x: 100,
    y: 100,
    dx: 0,
    dy: 0,
    dxMax: 5,
    dyMax: 20,
    lines: [[-100,-100,0,0], [0,0,-100,0], [-100,-100,-100,0]]
};

//Main game logic
const main = () => {
    if (running) {
        clear();
        drawAll();
        updateLocations();
        updateVelocities();
        requestAnimationFrame(main);
    }
}

//Use objects' velocities to move
function updateLocations() {
    objects.forEach((on) => {
        on.x += on.dx;
        on.y += on.dy;
        if (on.x >= area.width)
            on.x = area.width-1;
        if (on.x < 0)
            on.x = 0;
        if (on.y >= area.height)
            on.y = area.height-1;
        if (on.y < 0)
            on.y = 0;
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
    const friction = .9; //Speeds get slowed by .1 every frame
    const gravity = .5;
    let xChange = 0;
    let yChange = 0;
    if (keysDown[68]) //If d, increase speed right
        xChange += 1;
    if (keysDown[65]) //If a, increase speed left
        xChange -= 1;
    if (keysDown[87] && objects[0].y == area.height - 1) //If w && object on ground, jump
        yChange -= 10;

    //Calculates the new speeds
    objects[0].dx = objects[0].dx*friction + xChange;
    objects[0].dy = objects[0].dy + yChange + gravity;

    //Checks if the object is going too fast and
    //caps the speed, if necesary
    if (objects[0].dx > objects[0].dxMax)
        objects[0].dx = objects[0].dxMax;

    if (objects[0].dx < objects[0].dxMax*-1)
        objects[0].dx = objects[0].dxMax*-1;

    if (objects[0].dy > objects[0].dyMax)
        objects[0].dy = objects[0].dyMax;

    if (objects[0].dy < objects[0].dyMax*-1)
        objects[0].dy = objects[0].dyMax*-1;

    //If we're on the ground and didn't jump, have no vertical velocity
    if (yChange == 0 && objects[0].y == area.height -1)
        objects[0].dy = 0;
}

