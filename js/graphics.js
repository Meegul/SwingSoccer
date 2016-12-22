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

    const dx = x0 * cos - y0 * sin;
    const dy = y0 * cos + x0 * sin;
    const xAfter = dx + object.x;
    const yAfter = dy + object.y;
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

function drawFrameTime(time, lastFrames) {
    brush.font = "30px Arial";
    brush.fillStyle = "#000";
    brush.fillText(`${lastFrames}fps`, 800, 50);
    brush.fillText(`${time}ms`, 800, 80);
}

function drawBorder() {
    brush.strokeStyle = "#000";
    brush.rect(0, 0, mapWidth, mapHeight);
    brush.stroke();
}

//Draw all objects
function drawAll() {
    drawBackground(backgroundColor);
    drawBorder();
    objects.forEach((on) => {
        drawObject(on);
    });
    drawTime();
}

//Clear the canvas
function clear() {
    area.getContext("2d").clearRect(0, 0, area.width, area.height);
}
