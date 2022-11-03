


function getRandomSize() {//雪花的大小
  let r = pow(random(0, 1), 3);
  return constrain(r * 32, 30, 40);//控制雪花的大小在30和40之间

  // let r = randomGaussian() * 2.5;
  // return constrain(abs(r * r), 2, 36);
  // while (true) {
  //   let r1 = random(1);
  //   let r2 = random(1);
  //   if (r2 > r1) {
  //     return r1 * 36;
  //   }
  // }
}

class Snowflake {
  constructor(sx, sy, img) {
    let x = sx || random(width);
    let y = sy || random(-100, -10);
    this.img = img;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.angle = random(TWO_PI);
    this.dir = random(1) > 0.5 ? 1 : -1;
    this.xOff = 0;
    this.r = random(35, 45);//getRandomSize();
  }

  applyForce(force) {
    // Parallax Effect hack
    let f = force.copy();
    f.mult(this.r);

    // let f = force.copy();
    // f.div(this.mass);
    this.acc.add(f);
  }

  randomize() {
    let x = random(width);
    let y = random(-100, -10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.r = random(35, 45);//getRandomSize();
  }

  update() {
    this.xOff = sin(this.angle * 2) * 2 * this.r;
    // console.log(this.r);
    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.03);//限制雪花飘落的速度

    if (this.vel.mag() < 1) {
      this.vel.normalize();
    }

    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.y > height + this.r) {
      this.randomize();
    }

    // Wrapping Left and Right
    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }

    this.angle += (this.dir * this.vel.mag()) / 200;
  }

  render() {
    // stroke(255);
    // strokeWeight(this.r);
    // point(this.pos.x, this.pos.y);
    push();
    translate(this.pos.x + this.xOff, this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    if(noseY-140<this.pos.y && this.pos.y<noseY+140 && noseX-140<this.pos.x && this.pos.x<noseX+140){//在脸附近的雪花变为水滴
      //if(noseX-140<this.pos.x && this.pos.x<noseX+140){
      this.randomize();
      count++;
      // console.log('zahuishi');
      //}
    }else{
      image(this.img, 0, 0, this.r, this.r);
    }
    pop();

  }

  // offScreen() {
  //   return (this.pos.y > height + this.r);
  // }
}

class Particle {

  constructor(px, py) {

    this.x = px;
    this.y = py;
    this.reset();
  }
  reset() {
    this.vy = random(1.8, 2);
    this.maxy =  height - 50 - random(0, 50);
    this.r = 0;
    this.tr = 60;
    this.w = 3;//random(0.1, 2);
  }
  update() {
    if (this.y < this.maxy) {
      this.y += this.vy;
    } else {
      this.r++;//+=0.01;
    }
    if (this.r > this.tr) this.reset();
  }
  display() {
    noFill();

    strokeWeight(this.w);
    if (this.y < this.maxy) {
      stroke('skyblue');
      push();
      translate(this.x,this.y);
      beginShape();
      strokeWeight(1);
      vertex(0,-5);
      quadraticVertex(3, 0, 0, 1);
      quadraticVertex(-3,0, 0, -5);
      endShape(CLOSE);
      pop();
    } else {

      stroke('skyblue');//, map(this.r, 0, this.tr, 255, 0));
      // stroke(255, map(this.r, 0, this.tr, 255, 0));
      ellipse(this.x, this.y, this.r, this.r*.5);
      if(this.r>55){
        // this=null;remove index
        // this.pop();
        this.y = height+100;
      }
      // this.y = height+100;
    }
    //Fill();
  }
}

