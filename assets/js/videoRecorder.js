const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");


const startRecording = (stream) => {
    console.log(stream);

}
const getVideo = async() => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        startRecording(stream);
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop recording";
    } catch (error) {
        recordBtn.innerHTML = "Can't record";
    } finally {
        recordBtn.removeEventListener("click", getVideo);
    }
}

function init() {
    recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
    init();
}