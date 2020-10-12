var controllerOptions = {};
var trainingCompleted = false;

var numSamples = 0;
var numFeatures = 0;
var currentLabel = 0;

var predictIndex =0;
var meanPredictAcc = 0;
//var testingSampleIndex = 0;

var framesOfData = nj.zeros([5,4,6]);

const knnClassifier = ml5.KNNClassifier();
var predictLabel;

var currentFeatures = nj.array();

//var irisData = nj.;

//numFeatures = (test0.shape[1] - 1);

//numSamples = test0.shape[0];
var predictedClassLabels = nj.zeros([1]);

Leap.loop(controllerOptions, function(frame){
    clear();

    //console.log();

    //console.log(predictedClassLabels.toString());
    //var irisString = irisData.toString();

    if (trainingCompleted == false){

        train();
    }

    handleFrame(frame);
    previousNumHands = frame.hands.length;

    //console.log(framesOfData.toString());

});


function train(){

for (i =0; i < 100; i++){
    //console.log(train0.pick(null,null,null,i).toString());
    var features = train3.pick(null,null,null,i);
    features = features.reshape(1,120);
    //console.log(features.toString());
    knnClassifier.addExample(features.tolist(), 3);
    console.log(i, features);

    features = train5.pick(null,null,null,i);
    features = features.reshape(1,120);

    knnClassifier.addExample(features.tolist(), 5);
    console.log(i, features);
    }

trainingCompleted = true;
}

function test(){
        var xVals = CenterData();
        var currentMean = xVals.mean();
        var horizontalShift = (.5 - currentMean);
        var currentX, shiftedX;

        for (i=0; i<5; i++){
            for (s=0; s<4; s++){
                currentX = oneFrameOfData.get(i,s,0);
                shiftedX = currentX + horizontalShift;
                oneFrameOfData.set(i,s,0, shiftedX);

                currentX = oneFrameOfData.get(i,s,1);
                shiftedX = currentX + horizontalShift;
                oneFrameOfData.set(i,s,1, shiftedX);
            }
        }

        console.log(currentMean);

        predictLabel = knnClassifier.classify(framesOfData.tolist(),GotResults);



        function GotResults(err, result){

        predictedClassLabels[0] = parseInt(result.label);
        //console.log(predictedClassLabels[0]);

        predictIndex++;
        meanPredictAcc = (((predictIndex -1)*(meanPredictAcc)+ (predictedClassLabels[0]==5))/ predictIndex)
        //console.log(predictIndex, meanPredictAcc, predictedClassLabels[0]);


        //testingSampleIndex++;
        //if (testingSampleIndex > 99){
        //    testingSampleIndex = 0;
        //}
        }
 }

 function CenterData(){
    var xValues = framesOfData.slice([],[],[0,6,3])
    return xValues;
 }

function handleFrame(frame){
var interactionBox = frame.interactionBox;

    if (frame.hands.length >= 1){

    var numHands = frame.hands;

    var hand = frame.hands[0];
    handleHand(hand, numHands,interactionBox);

    test();
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

framesOfData.set(fingerIndex,indiBone.type,0,x);
framesOfData.set(fingerIndex,indiBone.type,1,y);
framesOfData.set(fingerIndex,indiBone.type,2,z);
framesOfData.set(fingerIndex,indiBone.type,3,x1);
framesOfData.set(fingerIndex,indiBone.type,4,y1);
framesOfData.set(fingerIndex,indiBone.type,5,z1);

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
    strokeWeight(7*5);
    line(canvasX,canvasY,canvasX2,canvasY2,);
    } else if (indiBone.type == 1){
    stroke(0,255,127);
    strokeWeight(5*5);
    line(canvasX,canvasY,canvasX2,canvasY2);
    } else if (indiBone.type == 2){
    stroke(60,179,113);
    strokeWeight(3*5);
    line(canvasX,canvasY,canvasX2,canvasY2);
    } else if (indiBone.type == 3){
    stroke('olive');
    strokeWeight(2*5);
    line(canvasX,canvasY,canvasX2,canvasY2);
}
} else if (numHands.length == 2){
    if (indiBone.type == 0){
    stroke(255,0,0);
    strokeWeight(7*5);
    line(canvasX,canvasY,canvasX2,canvasY2);
    } else if (indiBone.type == 1){
    stroke(255,99,71);
    strokeWeight(5*5);
    line(canvasX,canvasY,canvasX2,canvasY2);
    } else if (indiBone.type == 2){
    stroke(178,34,34);
    strokeWeight(3*5);
    line(canvasX,canvasY,canvasX2,canvasY2);
    } else if (indiBone.type == 3) {
    stroke(128,0,0);
    strokeWeight(2*5);
    line(canvasX,canvasY,canvasX2,canvasY2);
}
}
}

function RecordData (){

if (currentNumHands==2){
    currentSample++
    if (currentSample== numSamples){
        currentSample = 0;
    }
}

if (previousNumHands == 2 && currentNumHands == 1){
background(51);
//console.log(framesOfData.toString());
console.log(framesOfData.toString());

}
}












