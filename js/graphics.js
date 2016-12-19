const area = document.getElementById("game");
const brush = area.getContext("2d");
const cameraLocation = {
    x: 0,
    y: 0,
};

function moveCamera() {
    if (keysDown[40])
        cameraLocation.y += 1;
    if (keysDown[39])
        cameraLocation.x += 1;
    if (keysDown[38])
        cameraLocation.y -= 1;
    if (keysDown[37])
        cameraLocation.x -= 1;
}


//Used to calculate point after rotation
//It is assumed that the rotation is around
//the provided object
function rotateAroundObject(x0, y0, object) {
    const degree = object.angle / 180 * Math.PI;
    const cos = Math.cos(degree);
    const sin = Math.sin(degree);

    const dx = x0 * cos - y0 * sin;
    const dy = y0 * cos + x0 * sin;
    const xAfter = dx + object.x;
    const yAfter = dy + object.y;
    return [xAfter, yAfter];
}

//Draw a single object
function drawObject(object) {
    if (object.lines) {
        brush.beginPath();
        object.lines.forEach((on) => {
            const startPoints = rotateAroundObject(on[0], on[1], object);
            const endPoints = rotateAroundObject(on[2], on[3], object);
            brush.moveTo(startPoints[0] + cameraLocation.x, startPoints[1] + cameraLocation.y);
            brush.lineTo(endPoints[0] + cameraLocation.x, endPoints[1] + cameraLocation.y);
        });
        brush.stroke();
    }

    if (object.circles) {
        brush.beginPath();
        object.circles.forEach((on) => {
            const pointsAfterRotation = rotateAroundObject(on[0], on[1], object);
            brush.arc(pointsAfterRotation[0] + cameraLocation.x, pointsAfterRotation[1] + cameraLocation.y, on[2], 0, 2 * Math.PI);
        });
        brush.stroke();
    }
}

//Draw all objects
function drawAll() {
    objects.forEach((on) => {
        drawObject(on);
    });
}

//Clear the canvas
function clear() {
    area.getContext("2d").clearRect(0, 0, area.width, area.height);
}
