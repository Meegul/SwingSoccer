let running = false;
const objects = [];

objects[0] = {
    x0: 100,
    y0: 100,
    x: 100,
    y: 100,
    dx: 0,
    dy: 0,
    lines: [[-100,-100,0,0], [0,0,-100,100], [-100,-100,-100,100]]
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
    resetVelocities();
    let xChange = 0;
    let yChange = 0;
    if (keysDown[68]) //If d, move right
        xChange += 1;
    if (keysDown[65]) //If a, move left
        xChange -= 1;
    if (keysDown[87]) //If w, move up
        yChange -= 1;
    if (keysDown[83]) //If s, move down
        yChange += 1;
    objects[0].dx += xChange;
    objects[0].dy += yChange;
}

