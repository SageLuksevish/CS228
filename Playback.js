oneFrameOfData = nj.array([[[0.94075,0.13755, 1,0.94075,0.13755, 1],
        [0.94075,0.13755, 1,0.74487,0.18568, 1],
        [0.74487,0.18568, 1,0.61815,0.22105, 1],
        [0.61815,0.22105, 1,0.58581,0.24285, 1]],
       [[0.97227,0.22874, 1,0.77738,0.39907, 1],
        [0.77738,0.39907, 1,0.67934,0.46491, 1],
        [0.67934,0.46491, 1,0.6268,0.45639,0.95717],
        [0.6268,0.45639,0.95717,0.59637,0.42722,0.86815]],
       [[ 1,0.24871, 1,0.85412,0.41869, 1],
        [0.85412,0.41869, 1,0.75341,0.4906,0.98261],
        [0.75341,0.4906,0.98261,0.68841,0.4762,0.83032],
        [0.68841,0.4762,0.83032,0.64939,0.44012,0.74156]],
       [[ 1,0.25604, 1,0.94029,0.41304, 1],
        [0.94029,0.41304, 1,0.85466,0.49611,0.94997],
        [0.85466,0.49611,0.94997,0.79068,0.50593,0.80146],
        [0.00354,0.25429, 1,0.03624,0.21265, 1]],
       [[ 1,0.23523, 1, 1,0.3887, 1],
        [ 1,0.3887, 1,0.9794,0.45078,0.91069],
        [0.9794,0.45078,0.91069,0.94332,0.45567,0.79699],
        [ 0,0.18499, 1, 0,0.12792, 1]]]);



secondFrameOfData = nj.array([[[0.74024,0.10481, 1,0.74024,0.10481, 1],
        [0.74024,0.10481, 1,0.58103,0.17248, 1],
        [0.58103,0.17248, 1,0.45764,0.22554, 1],
        [0.45764,0.22554, 1,0.44433,0.22985, 1]],
       [[0.80086,0.18529, 1,0.66013,0.39107, 1],
        [0.66013,0.39107, 1,0.57768,0.46978, 1],
        [0.57768,0.46978, 1,0.52175,0.48197, 1],
        [0.52175,0.48197, 1,0.47997,0.47322, 1]],
       [[0.84259,0.18882, 1,0.74116,0.37905, 1],
        [0.74116,0.37905, 1,0.66606,0.46279, 1],
        [0.66606,0.46279, 1,0.6038,0.47743,0.97864],
        [0.6038,0.47743,0.97864,0.55661,0.46935,0.87683]],
       [[0.88142,0.17906, 1,0.82354,0.34062, 1],
        [0.82354,0.34062, 1,0.77922,0.44265, 1],
        [0.77922,0.44265, 1,0.73001,0.47739,0.95515],
        [0.73001,0.47739,0.95515,0.6875,0.48412,0.84887]],
       [[0.9083,0.14138, 1,0.88924,0.28712, 1],
        [0.88924,0.28712, 1,0.87826,0.35526, 1],
        [0.87826,0.35526, 1,0.85176,0.37524,0.97447],
        [0.8528,0.37579,0.97495,0.81705,0.37969,0.87331]]]);

var xStart = 0;
var yStart = 0;
var zStart = 0;
var xEnd = 0;
var yEnd = 0;
var zEnd = 0;

var frameIndex = 0;
var flopRate = 0;

function draw() {
    clear();


    for (n=0; n < 5; n++){

        for (s=0; s< 4; s++){
            //console.log(oneFrameOfData.toString());

            if(flopRate % 2 ==0){
            xStart = oneFrameOfData.get(n,s,0);
            yStart = oneFrameOfData.get(n,s,1);
            zStart = oneFrameOfData.get(n,s,2);
            xEnd = oneFrameOfData.get(n,s,3);
            yEnd = oneFrameOfData.get(n,s,4);
            zEnd = oneFrameOfData.get(5,5,5);
            var canvasX = window.innerWidth * xStart;
            var canvasY = window.innerHeight * (1-yStart);

            var canvasX2 = window.innerWidth * xEnd;
            var canvasY2 = window.innerHeight * (1-yEnd);
            line(canvasX, canvasY, canvasX2, canvasY2);
            }else{
            xStart = secondFrameOfData.get(n,s,0);
            yStart = secondFrameOfData.get(n,s,1);
            zStart = secondFrameOfData.get(n,s,2);
            xEnd = secondFrameOfData.get(n,s,3);
            yEnd = secondFrameOfData.get(n,s,4);
            zEnd = secondFrameOfData.get(5,5,5);
            var canvasX = window.innerWidth * xStart;
            var canvasY = window.innerHeight * (1-yStart);

            var canvasX2 = window.innerWidth * xEnd;
            var canvasY2 = window.innerHeight * (1-yEnd);
            line(canvasX, canvasY, canvasX2, canvasY2);
            }
            //console.log(xStart, yStart, zStart, xEnd, yEnd, zEnd);
        }
    }

    frameIndex++;

    if (frameIndex == 100){
    frameIndex = 0;
        if(flopRate == 0){
        flopRate = 1;
        }else{
        flopRate = 0;
        }

        console.log(flopRate);
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






