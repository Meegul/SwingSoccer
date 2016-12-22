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
        if (on.y + on.height >= mapHeight) {
            if (on.ball) {
                on.angle += on.dx;

                //Bounce when colliding with the ground
                if (Math.abs(on.dy) < 1) {
                    on.y = mapHeight - on.height;
                    on.dy = 0;
                } else {
                    on.dy = -1 * on.dy / 2;
                }
            } else {
                on.y = mapHeight - on.height;
                on.dy = 0;
            }
        }
        if (on.y < 0) {
            on.y = 0;
            on.dy = 0;
        }
    });
}

//Reset all objects' locations to the origin
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
    objects.forEach((on) => {
        const friction = on.friction; //Speeds get slowed by .1 every frame
        const gravity = 1.2;
        let xChange = 0;
        let yChange = 0;
        if (on.player) {
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
        }
        //Calculates the new speeds
        on.dx = on.dx * friction + xChange;
        on.dy = on.dy + yChange + gravity;

        //Checks if the object is going too fast and
        //caps the speed, if necessary
        if (on.dx > on.dxMax)
            on.dx = on.dxMax;

        if (on.dx < on.dxMax * -1)
            on.dx = on.dxMax * -1;

        if (on.dy > on.dyMax)
            on.dy = on.dyMax;

        if (on.dy < on.dyMax * -1)
            on.dy = on.dyMax * -1;

        //If we're on the ground and didn't jump, have no vertical velocity
        if (yChange === 0 && on.y + on.height === area.height)
            on.dy = 0;
    });
}

function roll(object) {
    if (object.ball && object.y + object.height === area.height) {
        object.angle += object.dx;
    }
}

function collisions() {
    let collisionPairs = [];
    return;
}

function doPhysics() {
    updateLocations();
    objects.forEach((on) => {
        roll(on);
    });
    collisions();
    updateVelocities();
}
