if (HandIsTooFarToTheLeft()|| HandIsTooFarToTheRight()|| HandIsTooHigh()|| HandIsTooLow()||
   HandIsTooFar()|| HandIsTooClose()){
        return true;
   }else{
        console.log("Hand is not centered.");
        return false;
   }

function HandIsCentered(){
    if (HandIsXCentered() && HandIsYCentered() && HandIsZCentered()){
        return true;
    }else{
        return false;
    }
}

function HandIsXCentered(){
    var xVals = CenterXData();
    var currentMean = xVals.mean();

    if (currentMean <= 0.75 && currentMean >= 0.25){
        return true;
    }else{return false; }
}
function HandIsYCentered(){
    var yVals = CenterYData();
    var currentMean = yVals.mean();

    if (currentMean >= 0.25 && currentMean <= 0.75){
        return true;
    }else{return false; }
}
function HandIsZCentered(){
    var zVals = CenterZData();
    var currentMean = zVals.mean();

    if (currentMean <= 0.75 && currentMean >= 0.25){
        return true;
    }else{return false; }
}