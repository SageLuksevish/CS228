var controllerOptions = {};

var i = 0;
var x = (.5 * window.innerWidth);
var y = (.5 * window.innerHeight);

function draw() {

Leap.loop(controllerOptions, function(frame)
{

fill(200,200,200);
circle(x, y, 50);

console.log(i);

i++;

}
);
}





