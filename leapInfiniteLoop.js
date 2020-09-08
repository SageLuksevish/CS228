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

var fingers = hand.fingers[0];

console.log(fingers);

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






