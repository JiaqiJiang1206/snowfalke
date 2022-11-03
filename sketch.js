
let particles = [];
let snow = [];
let gravity;

let zOff = 0;

let spritesheet;
let pOne;
let pTwo;
let pThree;
let pFour;
let pFive;

let textures = [];

let poseNet;
let pose;

let noseX;
let noseY;

let count = 0;//雨滴的数目


function preload() {
  spritesheet = loadImage('flakes32.png');
  // pOne = loadImage('1.png');
  // pTwo = loadImage('2.png');
  // pThree = loadImage('3.png');
  // pFour = loadImage('4.png');
  // pFive = loadImage('5.png');
}

function setup() {
  ellipseMode(RADIUS);
  imageMode(CORNER);
  createCanvas(windowWidth, windowHeight);

  //准备camera
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
  gravity = createVector(0, 0.3);//重力是一个y方向的矢量
  for (let x = 0; x < spritesheet.width; x += 32) {//切割雪花图像
    for (let y = 0; y < spritesheet.height; y += 32) {
      let img = spritesheet.get(x, y, 32, 32);
      image(img, x, y);
      textures.push(img);
    }
  }

  for (let i = 0; i < 50; i++) {//生成一百片雪花，i代表屏幕中有多少片雪花
    let x = random(width);
    let y = random(height);
    let design = random(textures);
    snow.push(new Snowflake(x, y, design));
  }
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  rectMode(CORNERS);// rect() 的前两个参数解读成形状其中一个角落的位置，而第三和第四个参数则被解读成对面角落的位置
}

function gotPoses(poses){
  if(poses.length > 0){
    pose = poses[0].pose;
  }
}

function modelLoaded(){
  console.log('poseNet ready');
}


function draw() {
  // background(0);
  // snow.push(new Snowflake());

  translate(video.width, 0);//视频左右翻转
  scale(-1, 1);
  background(0, 0, 0);
  image(video, 0, 0, width, width * video.height / video.width);
  translate(video.width, 0);//视频左右翻转
  scale(-1, 1);

  // text('123445', 50, 50, 80, 80);

  // translate(video.width, 0);//视频左右翻转
  // scale(-1, 1);


  if(pose){
    noseX = pose.nose.x;
    noseY = pose.nose.y;
    // fill('red');
    // ellipse(noseX, noseY, 100);
    // fill('white');
  }


  zOff += 0;//0.05;

  for (flake of snow) {
    let xOff = flake.pos.x / width;
    let yOff = flake.pos.y / height;
    let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
    let wind = p5.Vector.fromAngle(wAngle);
    wind.mult(0.1);
    if(noseY-140<flake.pos.y && flake.pos.y<noseY+140 && noseX-140<flake.pos.x && flake.pos.x<noseX+140){//在脸附近的雪花变为水滴
      particles.push(new Particle(flake.pos.x, flake.pos.y));

    }
    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();




  }
  // for (var i = 0; i < 50; i++) {
  //   if (particles.length < 200) particles.push(new Particle(snow[i].pos.x, snow[i].pos.y));
  // }

  // for (var i = 0; i < particles.length; i++) { //雨滴
  //   particles[i].update();
  //   particles[i].display();
  // }
  // for (let i = snow.length - 1; i >= 0; i--) {
  //   if (snow[i].offScreen()) {
  //     snow.splice(i, 1);
  //   }
  // }
  // translate(video.width, 0);//视频左右翻转
  // scale(-1, 1);
  // if(count<30){
  //   image(pOne, 50, height-200, 200, 200);
  // }else if(count>30 && count<100){
  //   image(pTwo, 50, height-300, 200, 300);
  // }else if(count>100 && count<300){
  //   image(pThree, 50, height-450, 300, 400);
  // }else if(count>300 && count<600){
  //   image(pFour, 0, height-600, 400, 550);
  // }else if(count>600){
  //   image(pFive, 0, height-700, 450, 600);
  // }

}

