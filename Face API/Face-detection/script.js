const video=document.getElementById('video');
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(
    res=>{
        console.log("models loaded");
    startRecording()})

function startRecording()
{
    navigator.getUserMedia({ video: true },function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
    },
    
     err=>console.log("error"))
    
}

video.addEventListener('play',()=>{

    const canvas=faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize={width:video.width,height:video.height}
    faceapi.matchDimensions(canvas,displaySize);
    setInterval(async()=>{
        const detection= await faceapi.detectAllFaces(video,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        
        const reSizedDetections=faceapi.resizeResults(detection,displaySize);
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
        faceapi.draw.drawDetections(canvas,reSizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas,reSizedDetections);
        faceapi.draw.drawFaceExpressions(canvas,reSizedDetections);
    },100)
})