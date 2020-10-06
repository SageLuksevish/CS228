var trainingCompleted = false;

var numSamples = 0;
var numFeatures = 0;
var currentLabel = 0;
var testingSampleIndex = 0;

const knnClassifier = ml5.KNNClassifier();
var predictLabel;

var currentFeatures = nj.array();

//var irisData = nj.;

//numFeatures = (test0.shape[1] - 1);

numSamples = test0.shape[0];
var predictedClassLabels = nj.zeros([numSamples]);


function draw() {
    clear();

    //console.log(predictedClassLabels.toString());
    //var irisString = irisData.toString();

    if (trainingCompleted == false){

        train();
    }

    test();


}


function train(){

for (i =0; i <test0.shape[0]; i++){
    //console.log(train0.pick(null,null,null,i).toString());
    var features = train3.pick(null,null,null,i);
    features = features.reshape(1,120);
    //console.log(features.toString());
    knnClassifier.addExample(features.tolist(), 3);

    features = train5.pick(null,null,null,i);
    features = features.reshape(1,120);

    knnClassifier.addExample(features.tolist(), 5);
    }

trainingCompleted = true;
}

function test(){

        var features = test0.pick(null,null,null,testingSampleIndex);

        features = features.reshape(1,120);

        predictLabel = knnClassifier.classify(features.tolist(),GotResults);



        function GotResults(err, result){

        //predictedClassLabels.set(testingSampleIndex,parseInt(result.label));
        predictedClassLabels[testingSampleIndex] = parseInt(result.label);

        testingSampleIndex++;
        if (testingSampleIndex > 99){
            testingSampleIndex = 0;
        }

        }

        console.log(testingSampleIndex);
        console.log(predictedClassLabels[testingSampleIndex]);

 }


        //currentLabel = irisData.pick(testingSampleIndex).get(4);








