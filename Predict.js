var trainingCompleted = false;


function draw() {
    clear();

    if (trainingCompleted == false){

        train();
    }

    test();

}


function train(){

console.log("I am being trained.");

trainingCompleted = true;
}

function test(){

console.log("I am being tested.");
}
