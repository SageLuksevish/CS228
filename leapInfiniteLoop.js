var controllerOptions = {};

var x = (.5 * window.innerWidth);
var y = (.5 * window.innerHeight);
var r = 0;


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
console.log(curFinger);
}
}


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

Leap.loop(controllerOptions, function(frame)
{
handleFrame(frame);
}
);






