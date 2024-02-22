let stars = [];
let  meteorX = 0;
let  meteorY = 200;
let  meteorSpeed = 1.2;
let ufoY = 100;
let ufoX = 200;
let velocity = 0.04;
const acceleration = 0.04;
let forceUp = 0;
let mass = 1;
let gravity = 1.5;
thrust = 0;
let downForce = 0;
velocityX = 0;
velocityY = 0;
let angle = 0;
let sideway = 3;
let gameIsRunning = true;

function setup() {
  createCanvas(590, 500);
  textSize(22); 
 
  // Fill with stars
  for (let i = 0; i < 860; i++) {
    const star = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      alpha: Math.random(),
    };
    stars.push(star);
  }
}
//Rocket
function ufo(x, y) {
  push();
  translate(x, y);
  rotate(angle); // Rotate the UFO based on angle
  drawSmoke(0, smokeY);
  fill(255, 0, 0);
  rect(0 - 18, 0, 36, 70);
  fill(255, 255, 255, 160);
  ellipse(0, 40, 25);
  fill(0, 255, 0);
  ellipse(0, 45, 15);
  fill(0, 0, 0);
  ellipse(-4, 45, 5);
  ellipse(4, 45, 5);
  triangle(-18, 0, 0, -30, 18, 0);
  pop();
}

//meteor
function meteor(x, y){
    fill(140, 140, 140);
  ellipse(meteorX, 120, 70, 50);
}
// Fire/Smoke
let smokeY = 90;
function drawSmoke(x, y) {
  fill(230, 167, 20);
  ellipse(x, y, 30, 50);
}

//start
function startScreen() {
  background(12, 12, 255);
  noStroke();
  for (let star of stars) {
    fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
    ellipse(star.x, star.y, 3);
    // Flashing
    star.alpha = star.alpha + 0.02;
  }
  fill(0, 0, 0);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(30);
  textFont("Courier New");
  text("Lunar Lander", width / 2, 180);
  textSize(22);
  text("Use the arrows to steer the rocket", width / 2, 230);
  text("Land on the dark spots to", width / 2, 290);
  text("get more or less points", width / 2, 310);
  text("Do not crash", width / 2, 340);
  text("Click to start...", width / 2, 360);
}

//game
function gameScreen() {
  background(30, 11, 150);
  noStroke();
 
  //stars
  for (let star of stars) {
    fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
    ellipse(star.x, star.y, 3);
    // Flashing
    star.alpha = star.alpha + 0.02;
  }
  
  fill(120, 120, 120);
  ellipse(110, 110, 60);
  fill(120, 120, 120);
  ellipse(400, 210, 60);
  
  //ground
  fill(255, 255, 102);
  rect(0, 420, 600, 200);
  //crates
  fill(255, 205, 100);
  ellipse(50, 430, 60, 20);
  ellipse(170, 430, 80, 20);
  ellipse(300, 430, 50, 20);
  ellipse(420, 430, 110, 20);

  push();
  translate(ufoX, ufoY);
  rotate(angle);
  ufo(0, 0);
  pop();

  if (gameIsRunning === true) {
    ufoY = ufoY + velocity;
    velocity = velocity + acceleration;
    if (keyIsPressed && keyCode === DOWN_ARROW) {
      smokeY = 70;
    } else {
      smokeY = 40;
    }
    //meteor
    meteor(meteorX, meteorY);
    meteorX -=  meteorSpeed;
    if ( meteorX < 0) { // Om kometen åker utanför högerkanten av canvas
        meteorX = width; // Återställ kometens position till början av canvas
    }
    //Up
    if (keyIsPressed) {
      if (keyCode === DOWN_ARROW) {
        velocity = velocity - 0.01;
      }
      if (angle !== 0 && keyIsPressed && keyCode === DOWN_ARROW) {
        // Calculate the changes in x and y based on the angle
        let direction = angle > 0 ? 1 : -1; 
        let deltaX = sideway * direction * cos(abs(angle));
        let deltaY = sideway * direction * sin(abs(angle));
        ufoX += deltaX;
        ufoY += deltaY;
      } else {
        if (keyIsPressed && keyCode === DOWN_ARROW) {
          smokeY = 70;
        } else {
          smokeY = 40;
        }
      }
      
      // In keyPressed() function
      if (keyIsPressed) {
        if (keyCode === DOWN_ARROW) {
          velocity = velocity - 0.3;
        }
        if (keyCode === RIGHT_ARROW) {
          angle = angle + (Math.PI / 180) * 4;
        }
        if (keyCode === LEFT_ARROW) {
          angle = angle - (Math.PI / 180) * 4;
        }
      }
    }

forceUp = thrust * mass;
downForce = -gravity;

velocityY = velocity + forceUp * Math.cos(angle) + 0.07 * downForce;
velocityX = velocityX + forceUp * Math.sign(angle);

ufoY -= velocityY;
ufoX += velocityX;

    if (angle > PI / 4) {
      ufoX = ufoX + sideway; // Öka x-värdet med hastigheten
      ufoY = ufoY + sideway; // Öka y-värdet med hastigheten
    }
    textSize(20);
    text("Speed: " + velocity.toFixed(2), 100, 30);
    if (ufoY > 360 || ufoY < -190) {
      gameIsRunning = false;
      console.log("Game over");
      fill(255);
    }
  }
}
function overScreen() {
  background(20, 21, 200);

  for (let star of stars) {
    fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
    ellipse(star.x, star.y, 3);
    // Flashing
    star.alpha = star.alpha + 0.02;
  }
  fill(255);
  textSize(32); 
  textAlign(CENTER, CENTER);
  text("Result", width / 2, 200);
  if (velocity > 3) {
    text("Crash", width / 2, height / 2);
  } else {
    text("Good job", width / 2, height / 2);
  }
  //Points
  if (ufoY > 360 && ufoX > 20 && ufoX < 80 && velocity < 3) {
    text("100p", width / 2, 90);
  } else if (ufoY > 360 && ufoX > 130 && ufoX < 210 && velocity < 3) {
    text("80p", width / 2, 90);
  } else if (ufoY > 360 && ufoX > 270 && ufoX < 325 && velocity < 3) {
    text("120p", width / 2, 90);
  } else if (ufoY > 360 && ufoX > 362 && ufoX < 475 && velocity < 3) {
    text("60p", width / 2, 90);
  } else {
    text("40p", width / 2, 90);
  }

}

let state = "start"; 

function draw() {
  if (state === "start") {
    startScreen();
  } else if (gameIsRunning === true) {
    gameScreen();
  } else if (state === "result") {
    overScreen();
  }
}
function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "game") {
    state = "result";
  } else if (state === "result") {
    state = "game";
    // Reset game variables if needed
    gameIsRunning = true;
    ufoY = 100;
    velocity = 1;
  }
}