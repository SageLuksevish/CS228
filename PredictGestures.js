var controllerOptions = {};
var trainingCompleted = false;

var numSamples = 0;
var numFeatures = 0;
var currentLabel = 0;
var currentNumHands;
var predictIndex =0;
var meanPredictAcc = 0;

var framesOfData = nj.zeros([5,4,6]);

const knnClassifier = ml5.KNNClassifier();
var predictLabel;

var currentFeatures = nj.array();
var predictedClassLabels = nj.zeros([1]);

var programState = 0;
var digitToShow = 0;
var timeSinceLastDigitChange = new Date();
var curNum = 0;

Leap.loop(controllerOptions, function(frame){
    clear();
    currentNumHands = frame.hands.length;

    DetermineState(frame);

    //console.log(programState);

    if (programState==0) {
        HandleState0(frame);
    }else if (programState==1){
       HandleState1(frame);
    }else{
       HandleState2(frame);
    }

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
    console.log(i, features.toString(),3);

    features = train5.pick(null,null,null,i);
    features = features.reshape(1,120);
    knnClassifier.addExample(features.tolist(), 5);
    console.log(i, features.toString(),5);

    features = train0.pick(null,null,null,i);
    features = features.reshape(1,120);
    knnClassifier.addExample(features.tolist(), 0);
    //console.log(i, features);

    features = train1.pick(null,null,null,i);
    features = features.reshape(1,120);
    knnClassifier.addExample(features.tolist(), 1);
    //console.log(i, features);

    features = train1Riofrio.pick(null,null,null,i);
    features = features.reshape(1,120);
    knnClassifier.addExample(features.tolist(), 1);

    features = train1Li.pick(null,null,null,i);
    features = features.reshape(1,120);
    knnClassifier.addExample(features.tolist(), 1);

    features = train2.pick(null,null,null,i);
    features = features.reshape(1,120);
    knnClassifier.addExample(features.tolist(), 2);
    //console.log(i, features);

    features = train4.pick(null,null,null,i);
    features = features.reshape(1,120);
    knnClassifier.addExample(features.tolist(), 4);
    //console.log(i, features);

    features = train6.pick(null,null,null,i);
    features = features.reshape(1,120);
    knnClassifier.addExample(features.tolist(), 6);

    features = train7.pick(null,null,null,i);
    features = features.reshape(1,120);
    knnClassifier.addExample(features.tolist(), 7);

    features = train8.pick(null,null,null,i);
    features = features.reshape(1,120);
    knnClassifier.addExample(features.tolist(), 8);

    features = train9.pick(null,null,null,i);
    features = features.reshape(1,120);
    knnClassifier.addExample(features.tolist(), 9);

    }

trainingCompleted = true;
}

function test(){
        var xVals = CenterXData();
        var currentMean = xVals.mean();
        var horizontalShift = (.5 - currentMean);
        //console.log(currentMean);

        var yVals = CenterYData();
        currentMean = yVals.mean();
        var verticalShift = (.5 - currentMean);
        //console.log(currentMean);

        var zVals = CenterZData();
        currentMean = zVals.mean();
        var forwardShift = (.5 - currentMean);
        //console.log(currentMean);

        var currentX, shiftedX, currentY, shiftedY, currentZ, shiftedZ;

        for (i=0; i<5; i++){
            for (s=0; s<4; s++){
                currentX = framesOfData.get(i,s,0);
                shiftedX = currentX + horizontalShift;
                framesOfData.set(i,s,0, shiftedX);

                currentX = framesOfData.get(i,s,3);
                shiftedX = currentX + horizontalShift;
                framesOfData.set(i,s,3, shiftedX);

                currentY = framesOfData.get(i,s,1);
                shiftedY = currentY + verticalShift;
                framesOfData.set(i,s,1, shiftedY);

                currentY = framesOfData.get(i,s,4);
                shiftedY = currentY + verticalShift;
                framesOfData.set(i,s,4, shiftedY);

                currentZ = framesOfData.get(i,s,2);
                shiftedZ = currentZ + forwardShift;
                framesOfData.set(i,s,2, shiftedZ);

                currentZ = framesOfData.get(i,s,5);
                shiftedZ = currentZ + forwardShift;
                framesOfData.set(i,s,5, shiftedZ);
            }
        }
        //xVals = CenterXData();
        //currentMean = xVals.mean();
        //console.log(currentMean);

        //yVals = CenterYData();
        //currentMean = yVals.mean();
        //console.log(currentMean);

        //zVals = CenterZData();
        //currentMean = zVals.mean();
        //console.log(currentMean);

        predictLabel = knnClassifier.classify(framesOfData.tolist(),GotResults);

        function GotResults(err, result){

        predictedClassLabels[0] = parseInt(result.label);
        //console.log(predictedClassLabels[0]);

        predictIndex++;
        if(predictedClassLabels[0]!=0){
            predictIndex =1;
        }

        if (digitToShow==0){
            curNum = 0;
        }else if(digitToShow==4){
            curNum = 4;
        }
        meanPredictAcc = (((predictIndex -1)*(meanPredictAcc)+ (predictedClassLabels[0]==curNum))/ predictIndex)

        //console.log(predictIndex, meanPredictAcc, predictedClassLabels[0]);
        }
 }

 function CenterXData(){
    var xValues = framesOfData.slice([],[],[0,6,3]);
    return xValues;
 }

 function CenterYData(){
    var yValues = framesOfData.slice([],[],[1,6,3]);
    return yValues;
 }
 function CenterZData(){
    var zValues = framesOfData.slice([],[],[2,6,3]);
    return zValues;
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

    framesOfData.set(fingerIndex,indiBone.type,0,x);
    framesOfData.set(fingerIndex,indiBone.type,1,y);
    framesOfData.set(fingerIndex,indiBone.type,2,z);
    framesOfData.set(fingerIndex,indiBone.type,3,x1);
    framesOfData.set(fingerIndex,indiBone.type,4,y1);
    framesOfData.set(fingerIndex,indiBone.type,5,z1);

    var canvasX = window.innerWidth/2 * normalizedPrevJoint[0];
    var canvasY = window.innerHeight/2 * (1 - normalizedPrevJoint[1]);

    var canvasX2 = window.innerWidth/2 * normalizedNextJoint[0];
    var canvasY2 = window.innerHeight/2 * (1 - normalizedNextJoint[1]);


    //[x,y] = transformCoords(x, y);
    //[x1, y1] = transformCoords(x1, y1);

    var cordSum = (x + x1 + y + y1 + z + z1);

    if (programState==0 && numHands==1){
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
        }
    }else if (programState==1 && numHands==1){
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
        }else if (programState==2 && numHands.length==1){

            var avg = meanPredictAcc;
                var stk = stroke(20,20,20);
                if(avg <=.15){
                        stk= stroke(255,0,0);
                    }else if (avg <=.3&& avg>=.15){
                        stk= stroke(255,99,71);
                    }else if (avg <= .45&& avg >=.3){
                        stk= stroke(178,34,34);
                    }else if (avg<= .65&& avg >=.45){
                        stk= stroke(60,179,113);
                    }else if (avg<= .8&& avg >=.65){
                        stroke(0,255,127);
                    }else{
                        stroke(124,252,0);
                    }

                if (indiBone.type == 0){
                    stk;
                    strokeWeight(7*5);
                    line(canvasX,canvasY,canvasX2,canvasY2,);
                } else if (indiBone.type == 1){
                    stk;
                    strokeWeight(5*5);
                    line(canvasX,canvasY,canvasX2,canvasY2);
                } else if (indiBone.type == 2){
                    stk;
                    strokeWeight(3*5);
                    line(canvasX,canvasY,canvasX2,canvasY2);
                } else if (indiBone.type == 3){
                    stk;
                    strokeWeight(2*5);
                    line(canvasX,canvasY,canvasX2,canvasY2);
                }

    }else if (numHands.length == 2){
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

function DetermineState(frame){

    handleFrame(frame);
    if (currentNumHands==0){
        programState = 0;
    }else if (HandIsUncentered()){
        programState = 1;
    }else {
        programState = 2;
    }
}

function HandleState0(frame) {
    DrawImageToHelpUserPutTheirHandOverTheDevice();
}

function HandleState1(frame) {

     if (HandIsTooFarToTheLeft()) {
        DrawArrowRight();
     }
     if (HandIsTooFarToTheRight()) {
        DrawArrowLeft();
     }
     if (HandIsTooHigh()) {
        DrawArrowDown();
     }
     if (HandIsTooLow()) {
        DrawArrowUp();
     }
     if (HandIsTooFar()) {
        DrawArrowBack();
     }
     if (HandIsTooClose()) {
        DrawArrowForward();
     }
}

function HandleState2(frame) {
    TrainKNNIfNotDoneYet();
    test();

    handleFrame(frame);
    DrawLowerRightPanel();
    DetermineWhetherToSwitchDigits()
}

function TrainKNNIfNotDoneYet(){

    if (trainingCompleted == false){
        train();
    }
}

function DrawImageToHelpUserPutTheirHandOverTheDevice(){

    image(img, 0,0,window.innerWidth/2,window.innerHeight/2);
}

function HandIsUncentered(){

    if (HandIsTooFarToTheLeft()){
        return true;
   }else if (HandIsTooFarToTheRight()){
        return true;
   }else if (HandIsTooHigh()){
        return true;
   }else if (HandIsTooLow()){
        return true;
   }else if (HandIsTooFar()){
        return true;
   }else if (HandIsTooClose()){
        return true;
   }else{
        return false;
   }
}

function HandIsTooFarToTheLeft(){
    var xVals = CenterXData();
    var currentMean = xVals.mean();

    if (currentMean <= 0.25){
        return true;
    }else{
        return false;
    }
}

function HandIsTooFarToTheRight(){
    var xVals = CenterXData();
    var currentMean = xVals.mean();

    if (currentMean >= 0.75){
        return true;
    }else{return false; }
}
function HandIsTooHigh(){
    var yVals = CenterYData();
    var currentMean = yVals.mean();

    if (currentMean >= 0.75){
        return true;
    }else{return false; }
}
function HandIsTooLow(){
    var yVals = CenterYData();
    var currentMean = yVals.mean();

    if (currentMean <= 0.25){
        return true;
    }else{return false; }
}
function HandIsTooFar(){
    var zVals = CenterZData();
    var currentMean = zVals.mean();

    if (currentMean <= 0.25){
        return true;
    }else{return false; }
}
function HandIsTooClose(){
    var zVals = CenterZData();
    var currentMean = zVals.mean();

    if (currentMean >= 0.75){
        return true;
    }else{return false; }
}

function DrawArrowRight(){
    image(rightImg, window.innerWidth/2, 0, 475, 300);
}
function DrawArrowLeft(){
    image(leftImg, window.innerWidth/2, 0, 475, 300);
}
function DrawArrowDown(){
    image(downImg, window.innerWidth/2, 0, 475, 300);
}
function DrawArrowUp(){
    image(upImg, window.innerWidth/2, 0, 475, 300);
}
function DrawArrowBack(){
    image(backImg, window.innerWidth/2, 0, 475, 300);
}
function DrawArrowForward(){
    image(forwardImg, window.innerWidth/2, 0, 475, 300);
}

function SignIn(){

    var list = document.getElementById("users");

    username = document.getElementById("username").value;

    if(IsNewUser(username,list)){

        CreateNewUser(username,list);

        CreateSignInItem(username, list);
    }else{
        ID = String(username) + "_signins";
        listItem = document.getElementById( ID );
        listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
    }

    console.log(list.innerHTML);

    return false;
}

function IsNewUser(username,list){

    var users = list.children;
    var usernameFound = false;

    for(i=0; i< users.length; i++){

        if(username == users[i].innerHTML){
            usernameFound = true;
        }
    }
    return (usernameFound == false);
}

function CreateNewUser(username, list){
    var item = document.createElement("li");
        item.id = String(username) + "_name";
        item.innerHTML = String(username);
        list.appendChild(item);
}

function CreateSignInItem(username, list){
    var item2 = document.createElement("li");
        item2.id = String(username) + "_signins";
        item2.innerHTML = 1;
        list.appendChild(item2);
}

function DrawLowerRightPanel(){

    if(digitToShow == 0){
        image(zeroImg, window.innerWidth/2, window.innerHeight/2,475,300);
    }else if (digitToShow == 4){
        image(fourImg, window.innerWidth/2, window.innerHeight/2,475,300);
    }else if (digitToShow == 1){
        image(zeroImgur, window.innerWidth/2, window.innerHeight/2,475,300);
    }else if (digitToShow == 5){
        image(fourImgur, window.innerWidth/2, window.innerHeight/2,475,300);
    }
}

function DetermineWhetherToSwitchDigits(){
   if (TimeToSwitchDigits()){

        SwitchDigits();
   }
}

function TimeToSwitchDigits(){

    if (meanPredictAcc >= .98){

        var currentTime = new Date();
        var difInMilliSeconds = currentTime - timeSinceLastDigitChange;
        //console.log(difInMilliSeconds);
        var difInSeconds = difInMilliSeconds/1000;
        //console.log(difInSeconds);

        if(digitToShow==1 || digitToShow==5){
            if(difInSeconds>=2 && meanPredictAcc >= .98){
                   return true;
            }
        }

        if(difInSeconds>=5 && meanPredictAcc >= .98){
            return true;
        }

        //if(difInSeconds>=6 && meanPredictAcc >= .98){
            //return true;
        //}
    }
}

function SwitchDigits(){

    if (digitToShow == 0){
        digitToShow = 1;
    }else if (digitToShow ==1){
        digitToShow = 4;
    }else if (digitToShow == 4){
        digitToShow = 5;
    }else if (digitToShow == 5){
        digitToShow = 0;
    }
    timeSinceLastDigitChange = new Date();
}

function ScaffoldDigits(){

    if (digitToShow == 0){
        digitToShow =1;
    }else{
        digitToShow = 5;
    }
    timeSinceLastDigitChange = new Date();
}