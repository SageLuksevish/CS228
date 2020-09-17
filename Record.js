var controllerOptions = {};

var x = 0;
var x1 = 0;
var y = 0;
var y1 = 0;
var z = 0;
var z1 = 0;
var rawXMin = 1000000;
var rawXMax = -1000000;
var rawYMin = 1000000;
var rawYMax = -1000000;

var previousNumHands = 0;
var currentNumHands = 0;

Leap.loop(controllerOptions, function(frame)
{
currentNumHands = frame.hands.length;
//console.log(currentNumHands);

clear();
handleFrame(frame);

previousNumHands = frame.hands.length;
//console.log(previousNumHands);
}
);


function draw() {
fill(233,197,28);
}

function handleFrame(frame){
if (frame.hands.length >= 1){

var numHands = frame.hands;

var hand = frame.hands[0];
handleHand(hand, numHands);
}
}

function handleHand(hand, numHands){
var fingers = hand.fingers;

for (var n = 0; n < 4; n++){
//handleFinger(fingers[n]);
for (var s =0; s < 5; s++){
var curFinger = fingers[s];
var bones = curFinger.bones;
handleBone(bones[n], numHands);
}
}
}

function handleBone(boneType, numHands){
var indiBone = boneType;

x = indiBone.nextJoint[0];
x1 = indiBone.prevJoint[0]
y = indiBone.nextJoint[1];
y1 = indiBone.prevJoint[1];

[x,y] = transformCoords(x, y);
[x1, y1] = transformCoords(x1, y1);

if (numHands.length == 1){

    if (indiBone.type == 0){
    stroke(124,252,0);
    strokeWeight(7);
    line(x1,y1,x,y,);
    } else if (indiBone.type == 1){
    stroke(0,255,127);
    strokeWeight(5);
    line(x1,y1,x,y,);
    } else if (indiBone.type == 2){
    stroke(60,179,113);
    strokeWeight(3);
    line(x1,y1,x,y,);
    } else {
    stroke(85,107,35);
    strokeWeight(2);
    line(x1,y1,x,y,);
}
} else if (numHands.length == 2){
    if (indiBone.type == 0){
    stroke(255,0,0);
    strokeWeight(7);
    line(x1,y1,x,y,);
    } else if (indiBone.type == 1){
    stroke(255,99,71);
    strokeWeight(5);
    line(x1,y1,x,y,);
    } else if (indiBone.type == 2){
    stroke(178,34,34);
    strokeWeight(3);
    line(x1,y1,x,y,);
    } else {
    stroke(128,0,0);
    strokeWeight(2);
    line(x1,y1,x,y,);
}
}
}

function transformCoords(x,y){
y *= -window.innerHeight;

if(x < rawXMin) {
rawXMin =x;
}

if(x > rawXMax) {
rawXMax =x;
}

if(y < rawYMin) {
rawYMin =y;
}

if(y > rawYMax) {
rawYMax =y;
}

x = ((x - rawXMin) / (rawXMax - rawXMin)) * (window.innerWidth)
y = ((y - rawYMin) / (rawYMax - rawYMin)) * (window.innerWidth)

return [x, y];
}

