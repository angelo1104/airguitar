const modelParams = {
    flipHorizontal: true,   // flip e.g for video
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 2,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
}

navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia

const video = document.querySelector('#video')
const audio = document.querySelector('#audio')

let model;

handTrack.load(modelParams).then(lmodel =>{
    model = lmodel;
})

handTrack.startVideo(video)
    .then(status=>{
        if (status){
            navigator.getUserMedia({video:{}},stream=>{
                video.srcObject = stream;

                setInterval(runDetection,100);
            },error => console.log(error))
        }
    })

function runDetection(){
    model.detect(video).then(predictions =>{
        if (predictions.length !== 0){
            const hand1 = predictions[0].bbox
            const x = hand1[0]
            const y = hand1[1]

            const cursor = document.querySelector('.fake-cursor')

            cursor.style.right = `${x}px`
            cursor.style.top = `${y}px`
        }
    })
}
