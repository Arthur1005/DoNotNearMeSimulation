let radius_;
let angle = 0;
let points = [];
const particles = 4000;

// Physics
const attraction = 0.02; 
const damping = 0.85;    // 摩擦力

let chaos = 0;           // 0.0 - 1.0
let rawDistance = 200;
let smoothDistance = 200;

// 聲音物件
let whiteNoise;
let synthOsc;
let audioStarted = false;

function setup() {  
  createCanvas(windowWidth, windowHeight);
  radius_ = 250;

  // Particles initial position
  for (let i = 0; i < particles; i++) {
    points.push({
      index: i,
      pos: createVector(0, 0),
      vel: createVector(0, 0)
    });
  }

  angle = 0; 
  updateTargets();
  for (let p of points) p.vel.set(0, 0);
}

// Click for sound
function mousePressed() {
  if (!audioStarted) {
    initAudio();
  }
}

function initAudio() {
  userStartAudio();
  
  // Initial Square
  whiteNoise = new p5.Noise('square');
  whiteNoise.start();
  whiteNoise.amp(0);
  
  // Initial sawtooth
  synthOsc = new p5.Oscillator('sawtooth');
  synthOsc.start();
  synthOsc.amp(0);
  
  audioStarted = true;
  console.log("Sound Activated");
}

function draw() {
  // 'mouseY' to 'chaos'
  rawDistance = map(mouseY, 0, height, 180, 20, true);
  smoothDistance = lerp(smoothDistance, rawDistance, 0.15); // 讓數值過渡更平滑
  chaos = map(smoothDistance, 20, 180, 1.0, 0.0, true);

  // 機率閃暗紅色
  if (chaos > 0.7 && random(1) < chaos * 0.3) {
    background(random(40, 80) * chaos, 0, 0);
  } else {
    background(10);
  }

  // Sound
  if (audioStarted && chaos > 0.02) {
    // White
    let noiseVol = map(chaos, 0.02, 1.0, 0.0, 0.65);
    whiteNoise.amp(noiseVol, 0.02);
    
    // Sawtooth
    let baseFreq = map(chaos, 0.02, 1.0, 60, 500);
    let freqMod = random(-250, 250) * pow(chaos, 2); // 越往下跳變幅度呈指數型暴增
    synthOsc.freq(baseFreq + freqMod);
    
    let oscVol = map(chaos, 0.2, 1.0, 0.0, 0.25, true);
    synthOsc.amp(oscVol, 0.02);
  } else if (audioStarted) {
    whiteNoise.amp(0, 0.1);
    synthOsc.amp(0, 0.1);
  }

  // Centering
  translate(width / 2, height / 2); 

  // Boxes
  // 'chaos=0' = 2px all the way to => 45px
  let currentGridSize = map(pow(chaos, 2), 0, 1, 2, 45); // power of

  rectMode(CENTER);
  noStroke();

  for (let p of points) {
    let i = p.index;

    // Same
    let homeX = sin(i + angle) * sin(i * i) * radius_;
    let homeY = cos(i * i) * radius_;
    let home = createVector(homeX, homeY);

    // Same
    let toHome = p5.Vector.sub(home, p.pos);
    let spring = toHome.mult(attraction);
    p.vel.add(spring);

    // Explosion
    if (chaos > 0.05) {
      let explodeForce = p5.Vector.random2D(); // random direction
      explodeForce.mult(chaos * 14);           // force
      p.vel.add(explodeForce);
    }

    // 更新物理位移與速度
    p.vel.mult(damping);
    p.pos.add(p.vel);

    // Colour
    // red, green, blue flashes
    if (chaos > 0.5) {
      fill(random(255) * chaos, random(150, 255) * random(1), random(255) * chaos, random(150, 255));
    } else {
      fill(235, map(chaos, 0, 0.5, 90, 220));
    }

    // Boxes render
    rect(p.pos.x, p.pos.y, currentGridSize, currentGridSize);
  }

  // spining speed
  angle += 0.005 + (chaos * 0.03 * random(0.5, 1.5));
}

// Reposition initial particles
function updateTargets() {
  for (let p of points) {
    let i = p.index;
    let x = sin(i + angle) * sin(i * i) * radius_;
    let y = cos(i * i) * radius_;
    p.pos.set(x, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}