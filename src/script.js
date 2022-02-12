var capture;
var song1 = "";
var song2 = "";
var song2Name = "Harry Potter theme"
var song1Name = "Giorno's theme"
var srw = 0;
var slw = 0;
var rwx = 0;
var rwy = 0;
var lwx = 0;
var lwy = 0;

function preload(){
    song2 = loadSound("src/sounds/music.mp3");
    song1 = loadSound("src/sounds/music2.mp3");
}

function setup(){
    createCanvas(640,480).position(650,100);
    capture = createCapture(VIDEO);
    capture.hide();

    pose = ml5.poseNet(capture, modelLoaded);
    pose.on("pose", gotPoses);
}
function keyPressed(){
    if(key){
        song2.stop();
        song1.stop();
    }
}
function modelLoaded(){
    console.log("FINALLY... \n IT WORK'S\n anyway back to my divorce papers")
}
function gotPoses(r){
    if(r.length > 0){
        srw = r[0].pose.keypoints[10].score;
        slw = r[0].pose.keypoints[9].score;
        console.log(r, srw, slw)

        rwx = r[0].pose.rightWrist.x;
        rwy = r[0].pose.rightWrist.y;
        console.log(rwx,rwy)

        lwx = r[0].pose.leftWrist.x;
        lwy = r[0].pose.leftWrist.y;
        console.log(rwx,rwy)
    }
}
function draw(){
    image(capture,0,0,640,480);
    if(srw > 0.2){
        song1.stop();
        song1.setVolume(1);
        song1.rate(1);
        document.getElementById("songName").innerHTML = song2Name;
        song2.play();
    }
    if(slw > 0.2){
        song2.stop();
        song2.setVolume(1);
        song2.rate(1);
        document.getElementById("songName").innerHTML = song1Name;
        song1.play();
    }
}