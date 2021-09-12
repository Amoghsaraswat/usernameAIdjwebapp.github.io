song = "";
leftWristX = 0;
leftWristY = 0;
song1 = "";
leftWristscore = 0;

function preload() {
    song = loadSound("music.mp3");
    song1 = loadSound("petreFan.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose",gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    songstatus = song.isPlaying();
    song1status = song1.isPlaying();
    fill("red");
    stroke("red");
    if (leftWristscore>0.2){
        circle(leftWristX,leftWristY,12);
        song.stop();
        if(song1status=false){
            song1.play();
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}

function modelLoaded() {
    console.log("poseNet is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristscore = results[0].pose.keypoints[9].score;

    }
}
