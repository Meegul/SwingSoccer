const r = document.getElementById("render"); //Start button
const c = document.getElementById("clear"); //Clear button

//When start is clicked, set running to true,
//and call the main method
r.addEventListener("click", () => {
    if (!running) {
        running = true;
        main();
    }
});

//When clear is clicked, stop rendering and
//reset everything.
c.addEventListener("click", () => {
    running = false;
    resetLocations();
    resetVelocities();
    clear();
});

const keysDown = []; //All keys currently pressed.

//Listeners to keep track of what keys are pressed.
addEventListener("keydown", (e) => {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", (e) => {
    keysDown[e.keyCode] = false;
}, false);