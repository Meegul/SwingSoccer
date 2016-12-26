const area = document.getElementById("game");
const brush = area.getContext("2d");
brush.lineWidth = 2;
const cameraLocation = {
    x: 0,
    y: 0,
};

function moveCamera() {
    //The camera will follow object[0]
    if (objects[0].x < area.width / 2)
        cameraLocation.x = 0;
    else if (mapWidth - objects[0].x < area.width / 2)
        cameraLocation.x = mapWidth - area.width;
    else cameraLocation.x = objects[0].x - area.width / 2;
}



//Used to calculate point after rotation
//It is assumed that the rotation is around
//the provided object
function rotateAroundObject(x0, y0, object) {
    const degree = object.angle / 180 * Math.PI;
    const cos = Math.cos(degree);
    const sin = Math.sin(degree);

    const offsetX = x0 - object.width / 2;
    const offsetY = y0 - object.height / 2;

    const dx = offsetX * cos - offsetY * sin;
    const dy = offsetY * cos + offsetX * sin;
    const xAfter = dx + object.x + object.width / 2;
    const yAfter = dy + object.y + object.height / 2;
    return {
        x: xAfter,
        y: yAfter,
    };
}

//Draw the background color
function drawBackground(color) {
    if (color) {
        brush.fillStyle = color;
    } else {
        brush.fillStyle = "#FFF";
    }
    brush.fillRect(0, 0, area.width, area.height);
}

//Draw a single object
function drawObject(object) {
    //Draw the circles for the object
    if (object.circles) {
        object.circles.forEach((on) => {
            brush.beginPath();

            //Calculate the points after rotation
            const pointsAfterRotation = rotateAroundObject(on.x0, on.y0, object);

            //Set the color of the line. Default to black.
            if (on.color) {
                brush.fillStyle = on.color;
                brush.strokeStyle = on.color;
            } else {
                brush.fillStyle = "#000";
                brush.strokeStyle = "#000";
            }

            //Move the brush to the proper location, with camera offset.
            brush.arc(pointsAfterRotation.x - cameraLocation.x,
                pointsAfterRotation.y + cameraLocation.y,
                on.radius, 0, 2 * Math.PI);

            //Display the line
            brush.stroke();

            //Fill, if directed
            if (on.fill)
                brush.fill();
        });
    }

    //Draw the lines for the object
    if (object.lines) {
        object.lines.forEach((on) => {
            brush.beginPath();

            //Calculate the points after rotation
            const startPoints = rotateAroundObject(on.x0, on.y0, object);
            const endPoints = rotateAroundObject(on.x1, on.y1, object);

            //Set the color of the line. Default to black.
            if (on.color) {
                brush.strokeStyle = on.color;
            } else brush.strokeStyle = "#000";

            //Move the brush to the proper location, with camera offset.
            brush.moveTo(startPoints.x - cameraLocation.x, startPoints.y + cameraLocation.y);
            brush.lineTo(endPoints.x - cameraLocation.x, endPoints.y + cameraLocation.y);

            //Display the result
            brush.stroke();
        });
    }
}

//Draw the time
function drawTime() {
    brush.font = "30px Arial";
    brush.fillStyle = "#000";
    const secondsLeft = timeRemaining / 1000;
    brush.fillText(`Time remaining: ${secondsLeft}`, 50, 50);
}

//Used to show debug info
function drawFrameTime(time, lastFrames, timeSinceLastFrame, totalRenderTime, totalTimeMax) {
    brush.font = "30px Arial";
    brush.fillStyle = "#000";
    brush.fillText(`Current fps: ${lastFrames}fps`, 650, 50);
    brush.fillText(`Frame time: ${time}ms`, 650, 80);
    brush.fillText(`In between frames: ${timeSinceLastFrame}ms`, 650, 110);
    brush.fillText(`Total time|max: ${totalRenderTime}|${totalTimeMax}ms`, 650, 140);
}

function drawBorder() {
    brush.strokeStyle = "#000";
    const xOffset = cameraLocation.x;
    const yOffset = cameraLocation.y;
    brush.moveTo(-xOffset, -yOffset);
    brush.lineTo(mapWidth - xOffset, 0);
    brush.lineTo(mapWidth - xOffset, mapHeight + yOffset);
    brush.lineTo(0, mapHeight + yOffset);
    brush.lineTo(-xOffset, -yOffset);
    brush.stroke();
}

function drawHitBox() {
    objects.forEach((on) => {
        brush.beginPath();
        brush.strokeStyle = "#FF0000";
        brush.font = "12px Arial";
        brush.fillStyle = "#FF0000";

        const topLeft = rotateAroundObject(0, 0, on);
        const topRight = rotateAroundObject(on.width, 0, on);
        const bottomRight = rotateAroundObject(on.width, on.height, on);
        const bottomLeft = rotateAroundObject(0, on.height, on);

        brush.fillText(`x:${Math.trunc(topLeft.x)},y:${Math.trunc(topLeft.y)}`,
            topLeft.x - cameraLocation.x,
            topLeft.y + cameraLocation.y);
        brush.moveTo(topLeft.x - cameraLocation.x, topLeft.y + cameraLocation.y);
        brush.fillText(`x:${Math.trunc(topRight.x)},y:${Math.trunc(topRight.y)}`,
            topRight.x - cameraLocation.x,
            topRight.y + cameraLocation.y);
        brush.lineTo(topRight.x - cameraLocation.x, topRight.y + cameraLocation.y);
        brush.fillText(`x:${Math.trunc(bottomRight.x)},y:${Math.trunc(bottomRight.y)}`,
            bottomRight.x - cameraLocation.x,
            bottomRight.y + cameraLocation.y);
        brush.lineTo(bottomRight.x - cameraLocation.x, bottomRight.y + cameraLocation.y);
        brush.fillText(`x:${Math.trunc(bottomLeft.x)},y:${Math.trunc(bottomLeft.y)}`,
            bottomLeft.x - cameraLocation.x,
            bottomLeft.y + cameraLocation.y);
        brush.lineTo(bottomLeft.x - cameraLocation.x, bottomLeft.y + cameraLocation.y);
        brush.lineTo(topLeft.x - cameraLocation.x, topLeft.y + cameraLocation.y);
        brush.stroke();
    });
}

//Draw all objects
function drawAll() {
    drawBackground(backgroundColor);
    drawBorder();
    objects.forEach((on) => {
        drawObject(on);
    });
    if (debug) {
        drawHitBox();
    }
    drawTime();
}

//Clear the canvas
function clear() {
    area.getContext("2d").clearRect(0, 0, area.width, area.height);
}
