var controllerOptions = {};

var x = 0;
var y = 0;
var z = 0;
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
var curFingerType = curFinger.type;

var nameMap = ["thumb", "index", "middle", "ring", "pinky"];
var curFingerName = nameMap[curFingerType];
//var fingerName = nameMap[n];

if (curFingerName == "index"){
console.log(curFinger.tipPosition);

x = curFinger.tipPosition[0];
y = curFinger.tipPosition[1];
z = curFinger.tipPosition[2];

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

newY = ((y - rawYMin) / (rawYMax - rawYMin)) * (window.innerWidth)

circle(newX,newY,100);
}
}


//function getRndInteger(min, max) {
 // return Math.floor(Math.random() * (max - min + 1) ) + min;
//}

Leap.loop(controllerOptions, function(frame)
{
clear();
handleFrame(frame);
}
);
