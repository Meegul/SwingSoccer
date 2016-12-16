let running = false;
const objects = [];

objects[0] = {
    x0: 200,
    y0: 200,
    x: 200,
    y: 200,
    dx: 0,
    dy: 0,
    dxMax: 10,
    dyMax: 40,
    lines: [[0, 0, 0, 100], [0, 100, -50, 150], [0, 100, 50, 150], [0, 20, -50, 20], [0, 20, 50, 20]],
    circles: [[0, -50, 50]],
    height: 150,
    width: 50,
    angle: 0
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
        //Update locations
        on.x += on.dx;
        on.y += on.dy;

        //Resolve errors that would've occurred
        if (on.x + on.width > area.width) {
            on.x = area.width - on.width;
            on.dx = 0;
        }
        if (on.x - on.width < 0) {
            on.x = 0 + on.width;
            on.dx = 0;
        }
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
    const friction = .86; //Speeds get slowed by .1 every frame
    const gravity = 1.2;
    let xChange = 0;
    let yChange = 0;
    if (keysDown[68]) //If d, increase speed right
        xChange += 2;
    if (keysDown[65]) //If a, increase speed left
        xChange -= 2;
    if (keysDown[87] && objects[0].y + objects[0].height == area.height) //If w && object on ground, jump
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
    if (yChange == 0 && objects[0].y + objects[0].height == area.height)
        objects[0].dy = 0;
}

