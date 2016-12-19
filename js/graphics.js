const area = document.getElementById("game");
const brush = area.getContext("2d");

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
    brush.beginPath();
    object.lines.forEach((on) => {
        const startPoints = rotateAroundObject(on[0], on[1], object);
        const endPoints = rotateAroundObject(on[2], on[3], object);
        brush.moveTo(startPoints[0], startPoints[1]);
        brush.lineTo(endPoints[0], endPoints[1]);
    });
    brush.stroke();
    brush.beginPath();
    object.circles.forEach((on) => {
        const pointsAfterRotation = rotateAroundObject(on[0], on[1], object);
        brush.arc(pointsAfterRotation[0], pointsAfterRotation[1], on[2], 0, 2 * Math.PI);
    });
    brush.stroke();
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
