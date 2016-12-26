"use strict";var r=document.getElementById("render"),c=document.getElementById("clear");//Start button
//Clear button
//When start is clicked, set running to true,
//and call the main method
r.addEventListener("click",function(){running||(running=!0,startGame(),main())}),c.addEventListener("click",function(){running=!1,started=!1,resetLocations(),resetVelocities(),clear(),cameraLocation.x=0,cameraLocation.y=0});var keysDown=[];//All keys currently pressed.
//Listeners to keep track of what keys are pressed.
addEventListener("keydown",function(a){keysDown[a.keyCode]=!0},!1),addEventListener("keyup",function(a){keysDown[a.keyCode]=!1},!1);