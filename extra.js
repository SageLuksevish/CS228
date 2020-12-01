function DetermineWhetherToSwitchDigits(){
   if (TimeToSwitchDigits()){

        SwitchDigits();
   }
}

function TimeToSwitchDigits(){

    var currentTime = new Date();
    var difInMilliSeconds = currentTime - timeSinceLastDigitChange;
    //console.log(difInMilliSeconds);
    var difInSeconds = difInMilliSeconds/1000;
    //console.log(difInSeconds);
    if (difInSeconds>=5){
        return true;
    }
}

function SwitchDigits(){

    if (digitToShow == 0){
        digitToShow =4;
    }else{
        digitToShow = 0;
    }
    timeSinceLastDigitChange = new Date();
}