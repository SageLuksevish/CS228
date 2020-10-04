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

var numSamples = 2;
var currentSample = 0;

//var normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);

var previousNumHands = 0;
var currentNumHands = 0;

var framesOfData = nj.zeros([5,4,6,numSamples]);

Leap.loop(controllerOptions, function(frame)
{
currentNumHands = frame.hands.length;


clear();
handleFrame(frame);

previousNumHands = frame.hands.length;
}
);


function draw() {
fill(233,197,28);
}

function handleFrame(frame){
var interactionBox = frame.interactionBox;

if (frame.hands.length >= 1){

var numHands = frame.hands;

var hand = frame.hands[0];
handleHand(hand, numHands,interactionBox);
}
}

function handleHand(hand, numHands, interactionBox){
var intBox = interactionBox;
var fingers = hand.fingers;

for (var n = 0; n < 4; n++){
//handleFinger(fingers[n]);
for (var s =0; s < 5; s++){
var curFinger = fingers[s];
var bones = curFinger.bones;
var fingType = curFinger.type;

handleBone(bones[n], numHands, fingType, intBox);
}
}
}

function handleBone(boneType, numHands, fingerIndex, intBox){
var interBox = intBox;
var indiBone = boneType;

var bonePrevJoint = indiBone.prevJoint;
var boneNextJoint = indiBone.nextJoint;


var normalizedPrevJoint = interBox.normalizePoint(bonePrevJoint, true);
//console.log(normalizedPrevJoint);

var normalizedNextJoint = interBox.normalizePoint(boneNextJoint, true);

x = normalizedPrevJoint[0];
y = normalizedPrevJoint[1];
z = normalizedPrevJoint[2];
x1 = normalizedNextJoint[0]
y1 = normalizedNextJoint[1];
z1 = normalizedNextJoint[2];

framesOfData.set(fingerIndex,indiBone.type,0,currentSample,x);
framesOfData.set(fingerIndex,indiBone.type,1,currentSample,y);
framesOfData.set(fingerIndex,indiBone.type,2,currentSample,z);
framesOfData.set(fingerIndex,indiBone.type,3,currentSample,x1);
framesOfData.set(fingerIndex,indiBone.type,4,currentSample,y1);
framesOfData.set(fingerIndex,indiBone.type,5,currentSample,z1);

var canvasX = window.innerWidth * normalizedPrevJoint[0];
var canvasY = window.innerHeight * (1 - normalizedPrevJoint[1]);

var canvasX2 = window.innerWidth * normalizedNextJoint[0];
var canvasY2 = window.innerHeight * (1 - normalizedNextJoint[1]);


//[x,y] = transformCoords(x, y);
//[x1, y1] = transformCoords(x1, y1);

var cordSum = (x + x1 + y + y1 + z + z1);



if (numHands.length == 1){

    if (indiBone.type == 0){
    stroke(124,252,0);
    strokeWeight(7);
    line(canvasX,canvasY,canvasX2,canvasY2,);
    } else if (indiBone.type == 1){
    stroke(0,255,127);
    strokeWeight(5);
    line(canvasX,canvasY,canvasX2,canvasY2);
    } else if (indiBone.type == 2){
    stroke(60,179,113);
    strokeWeight(3);
    line(canvasX,canvasY,canvasX2,canvasY2);
    } else {
    stroke(canvasX,canvasY,canvasX2,canvasY2);
    strokeWeight(2);
    line(x1,y1,x,y,);
}
} else if (numHands.length == 2){
    if (indiBone.type == 0){
    stroke(255,0,0);
    strokeWeight(7);
    line(canvasX,canvasY,canvasX2,canvasY2);
    } else if (indiBone.type == 1){
    stroke(255,99,71);
    strokeWeight(5);
    line(canvasX,canvasY,canvasX2,canvasY2);
    } else if (indiBone.type == 2){
    stroke(178,34,34);
    strokeWeight(3);
    line(canvasX,canvasY,canvasX2,canvasY2);
    } else {
    stroke(128,0,0);
    strokeWeight(2);
    line(canvasX,canvasY,canvasX2,canvasY2);
}
}

RecordData();

}



function RecordData (){

if (previousNumHands == 2 && currentNumHands == 1){
background(51);
//console.log(framesOfData.toString());
console.log(framesOfData.pick(null,null,null,1).toString());
}
}

