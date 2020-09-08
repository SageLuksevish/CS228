var controllerOptions = {};

var x = (.5 * window.innerWidth);
var y = (.5 * window.innerHeight);
var r = 0;


function draw() {
fill(233,197,28);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

Leap.loop(controllerOptions, function(frame)
{
if (frame.hands.length == 1){

var hand = frame.hands[0];

var fingers = hand.fingers;

for (var n = 0; n < fingers.length; n++){

var currentFinger = fingers[n];
var currentFingerType = currentFinger.type;

var nameMap = ["thumb", "index", "middle", "ring", "pinky"];
var currentFingerName = nameMap[currentFingerType];
var fingerName = nameMap[n];

if (currentFingerName == "index"){
console.log(currentFinger);
}

//console.log(fingers[n]);

//console.log(fingers);
}

//console.log(fingers);
//console.log(frame.hands[0]);
}

//clear();

//r = getRndInteger(-1,1);
//s = getRndInteger(-1,1);

//x += r;
//y += s;

//circle(x, y, 50);

}
);






