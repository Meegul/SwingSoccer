const area = document.getElementById("game");
const brush = area.getContext("2d");

//Draw all objects
function drawAll() {
    objects.forEach((on) => {
        drawObject(on);
    });
}

//Clear the canvas
function clear() {
    area.getContext("2d").clearRect(0,0,area.width,area.height);
}

//Draw a single object
function drawObject(object) {
    brush.beginPath();
    object.lines.forEach((on) => {
        brush.moveTo(on[0] + object.x, on[1] + object.y);
        brush.lineTo(on[2] + object.x, on[3] + object.y);
    });
    brush.stroke();
    brush.beginPath();
    object.circles.forEach((on) => {
        brush.arc(on[0] + object.x, on[1] + object.y, on[2], 0, 2*Math.PI);
    });
    brush.stroke();
}