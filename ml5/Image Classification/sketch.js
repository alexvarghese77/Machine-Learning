let mobilenet; // Variable to hold model 
let img;// IVariable to store image details

//Setup function run once while loading the application 
function setup()
{
    createCanvas(600, 500);// Creating the canvase 
    img=loadImage("img/cat.jpeg",successImageLoad); // loading the image to DOM callback for success
    background(0); // Background set to blck

    mobilenet=ml5.imageClassifier('MobileNet',modelReady) // getting model
}
function modelReady() // callback for successfull model fetch
{
    console.log("modelReady");
    mobilenet.predict(img,gotResults) ; // checking image with model
    
}
function successImageLoad(img)  // Loading image to the DOM after cllabck
{
    image(img, 0, 0, width, height)
}
function gotResults(err,results)  // fetching result and printing
{
if(err)
{
console.log(err);

}
else
{
    console.log(results);
    let label=results[0].className;
    fill(0);
    textSize(64);
    text(label, 10, height-5)

    createP(label)
}
}

// Next step
// Make it dragg and drop
// read from the image draw
// read from the webcam