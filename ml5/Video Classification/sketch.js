
let video;
let classifier;

function setup(){
    createCanvas(600, 500);
    video=createCapture(VIDEO);
    classifier=ml5.imageClassifier('MobileNet',video,modelReady)
}
function modelReady(){
    
}
function videoCapturedSuccessfully(){
    console.log("Video loaded successfuly")
}


