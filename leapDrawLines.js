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


function draw() {
fill(233,197,28);
}

function handleFrame(frame){
if (frame.hands.length == 1){

var hand = frame.hands[0];
handleHand(hand);
}
}

function handleHand(hand){
var fingers = hand.fingers;

for (var n = 0; n < fingers.length; n++){
handleFinger(fingers[n]);
}
}

function handleFinger(nxtFinger){
var curFinger = nxtFinger;
var bones = curFinger.bones;

for (var n = 0; n < bones.length ; n++){
var boneType = bones[n];

handleBone(boneType);
}}

function handleBone(boneType){
var indiBone = boneType;

x = indiBone.nextJoint[0];
x1 = indiBone.prevJoint[0]
y = indiBone.nextJoint[1];
y1 = indiBone.prevJoint[1];
z = indiBone.nextJoint[2];
z1 = indiBone.prevJoint[2];

transformCoords(x, y);
transformCoords(x1, y1);

line(newX,newY,z,newX1,newY1,z1);
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

newX = ((x - rawXMin) / (rawXMax - rawXMin)) * (window.innerWidth)
newX1 = ((x1 - rawXMin) / (rawXMax - rawXMin)) * (window.innerWidth)

newY = ((y - rawYMin) / (rawYMax - rawYMin)) * (window.innerWidth)
newY1 = ((y1 - rawYMin) / (rawYMax - rawYMin)) * (window.innerWidth)

}

Leap.loop(controllerOptions, function(frame)
{
clear();
handleFrame(frame);
}
);
