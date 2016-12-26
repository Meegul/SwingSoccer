"use strict";var running=!1,started=!1,objects=[],mapWidth=0,mapHeight=0,backgroundColor="#000",startTime=0,endTime=1e4,timeRemaining=0;//Whether the game is being rendered
//Whether the actual game is in progress
function updateTime(){var a=new Date().getTime();timeRemaining=endTime-a}function loadLevel(a){running=!1;var b=void 0;switch(a){case 0:b=level0;break;default:}b&&(mapWidth=b.mapWidth,mapHeight=b.mapHeight,backgroundColor=b.backgroundColor,objects=b.objects),running=!0}function startGame(){startTime=new Date().getTime(),endTime=startTime+60000}//Debugging variables
var debug=!0,startSecond=0,lastFrameEnd=0,lastFrames=0,frames=0,timeSinceLastFrame=0,totalTimeToRender=0,maxTotalTime=0;//Used for FPS calc
//When the last frame ended
//Frames last second
//Frames this second
//Time in between frames
//Time in between frames + render time
//Maximum totalTimeToRender in a second
function debugData(a,b){1e3<=b-startSecond&&(lastFrames=frames,frames=0,startSecond=b,maxTotalTime=totalTimeToRender),frames++,timeSinceLastFrame=a-lastFrameEnd,totalTimeToRender=b-lastFrameEnd,maxTotalTime<totalTimeToRender&&(maxTotalTime=totalTimeToRender),lastFrameEnd=b,drawFrameTime(b-a,lastFrames,timeSinceLastFrame,totalTimeToRender,maxTotalTime)}//Main game logic
var main=function main(){if(running){var a=new Date().getTime();clear(),drawAll(),moveCamera(),doPhysics(),updateTime();var b=new Date().getTime();debugData(a,b),requestAnimationFrame(main)}},resize=function resize(){var a=window.innerWidth<window.innerHeight?window.innerHeight:window.innerHeight,b=document.getElementById("game");b.style.width=a-2,b.style.height=a-2},init=function init(){resize(),loadLevel(0),startGame(),main()};window.onload=init,window.onresize=resize;