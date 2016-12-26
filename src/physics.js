let lastTime = 0;
let currentTime = 0;

//Use objects' velocities to move
function updateLocations() {
    const timeElapsed = (currentTime - lastTime) / 1000;
    //console.log(timeElapsed);
    objects.forEach((on) => {
        //Update locations
        on.x += on.dx * timeElapsed * 60;
        on.y += on.dy * timeElapsed * 60;

        //Update angles
        on.angle += on.dTheta * timeElapsed * 60;

        //Resolve errors that would've occurred
        if (on.x + on.width > mapWidth) {
            on.x = mapWidth - on.width;
            on.dx = 0;
        }
        if (on.x < 0) {
            on.x = 0;
            on.dx = 0;
        }
        if (on.y + on.height >= mapHeight) {
            on.y = mapHeight - on.height;
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
        const friction = on.friction;
        const gravity = 1.2;
        let xChange = 0;
        let yChange = 0;
        if (on.player) {
            if (keysDown[68]) //If d, increase speed right
                xChange += 2;
            if (keysDown[65]) //If a, increase speed left
                xChange -= 2;
            if (keysDown[87] && on.y + on.height === area.height) //If w && object on ground, jump
                yChange -= 25;

            //TESTING ANGLES
            if (keysDown[69] && on.dTheta < on.dThetaMax)
                on.dTheta++;
            if (keysDown[81] && on.dTheta > -1 * on.dThetaMax)
                on.dTheta--;
        }
        //Calculates the new speeds
        on.dx = on.dx * friction + xChange;
        on.dy = on.dy + yChange + gravity;

        if (!on.ball) {
            //Not a ball, let's have some dTheta friction
            on.dTheta *= on.friction;
        }

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
        if (on.player && yChange === 0 && on.y + on.height >= area.height) {
            on.dy = 0;
        }

        if (on.ball && on.y + on.height >= mapHeight) { //We should bounce!
            if (Math.abs(on.dy) < 1) {
                on.dy = 0;
            } else {
                on.dy *= -1 * 0.98;
            }
        }
    });
}

function roll(object) {
    if (object.ball && object.y + object.height >= area.height) {
        object.dTheta = object.dx;
    }
    if (object.dTheta > object.dThetaMax) {
        object.dTheta = object.dThetaMax;
    }
}

function collisions() {
    const collisionPairs = [];
    objects.forEach((on1) => {
        const topLeft1 = rotateAroundObject(0, 0, on1);
        const topRight1 = rotateAroundObject(on1.width, 0, on1);
        const bottomRight1 = rotateAroundObject(on1.width, on1.height, on1);
        const bottomLeft1 = rotateAroundObject(0, on1.height, on1);
        const object1 = new SAT.Polygon(null, [
            new SAT.Vector(topLeft1.x, topLeft1.y),
            new SAT.Vector(topRight1.x, topRight1.y),
            new SAT.Vector(bottomRight1.x, bottomRight1.y),
            new SAT.Vector(bottomLeft1.x, bottomLeft1.y),
        ]);
        objects.forEach((on2) => {
            if (on1 === on2) //Don't collide with self
                return;

            const topLeft2 = rotateAroundObject(0, 0, on2);
            const topRight2 = rotateAroundObject(on2.width, 0, on2);
            const bottomRight2 = rotateAroundObject(on2.width, on2.height, on2);
            const bottomLeft2 = rotateAroundObject(0, on2.height, on2);
            const object2 = new SAT.Polygon(null, [
                new SAT.Vector(topLeft2.x, topLeft2.y),
                new SAT.Vector(topRight2.x, topRight2.y),
                new SAT.Vector(bottomRight2.x, bottomRight2.y),
                new SAT.Vector(bottomLeft2.x, bottomLeft2.y),
            ]);
            const response = new SAT.Response();
            const collided = SAT.testPolygonPolygon(object1, object2, response);
            if (collided && collisionPairs.indexOf([on2, on1]) === -1) {
                collisionPairs.push([on1, on2, response]);
            }
        });
    });
    collisionPairs.forEach((pair) => {
        //console.log(pair[0].ball + pair[2].overlapV);
        if (pair[0].ball) {
            pair[0].dx -= pair[2].overlapV.x;
            pair[0].dy -= pair[2].overlapV.y;
        } else {
            pair[1].dx += pair[2].overlapV.x;
            pair[1].dy += pair[2].overlapV.y;
        }
    });
}

function doPhysics() {
    currentTime = new Date().getTime();
    updateLocations();
    objects.forEach((on) => {
        roll(on);
    });
    collisions();
    updateVelocities();
    lastTime = new Date().getTime();
}


//For server-side testing purposes:
if (typeof exports !== "undefined") {
    var area;
    exports.area = (newArea) => {
        area = newArea;
    };
    exports.roll = (object) => {
        roll(object);
    };
}
