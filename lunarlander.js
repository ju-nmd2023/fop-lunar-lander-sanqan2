let stars = [];
function setup() {
  createCanvas(590, 500);
  background(255);

  textSize(22); // Set text size
  textFont("Arial"); // Set text font

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
//ufo
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
// Fire/Smoke
let smokeY = 90;
function drawSmoke(x, y) {
  fill(230, 167, 20);
  ellipse(x, y, 30, 50);
}

let ufoY = 100;
let ufoX = 200;
let velocity = 1;
const acceleration = 0.1;
let angle = 0;
let superd = 3;
let gameIsRunning = true;

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
  text("Lunar Lander", 220, 180);
  text("Use the arrows to steer the rocket", 120, 230);
  text("Do not crash", 230, 260);
  text("Click to start...", 230, 320);
}

//game
function gameScreen() {
  background(30, 11, 150);
  noStroke();
  //
  fill(80, 250, 80);
  ellipse(110, 110, 60);
  //stars
  for (let star of stars) {
    fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
    ellipse(star.x, star.y, 3);
    // Flashing
    star.alpha = star.alpha + 0.02;
  }

  fill(100);
  ellipse(340, 100, 30, 40);
  fill(150);
  rect(335, 90, 10, 5);
  fill(255, 255, 0);
  rect(330, 115, 20, 5);
  fill(150);
  rect(328, 120, 24, 3);

  //ground
  fill(255, 255, 102);
  rect(0, 420, 600, 200);
  //crates
  fill(255, 205, 100);
  ellipse(50, 430, 60, 20);
  ellipse(170, 430, 80, 20);
  ellipse(300, 430, 50, 20);
  ellipse(420, 430, 110, 20);

  push(); // Spara nuvarande transformationsmatris
  translate(ufoX, ufoY);
  rotate(angle); // Använd vinkeln för rotation
  ufo(0, 0); // Ritar UFO relativt till den övre vänstra hörnet av UFO
  pop();

  if (gameIsRunning === true) {
    ufoY = ufoY + velocity;
    velocity = velocity + acceleration;
    if (keyIsPressed && keyCode === DOWN_ARROW) {
      smokeY = 70;
    } else {
      smokeY = 40;
    }
    //Up
    if (keyIsPressed) {
      if (keyCode === DOWN_ARROW) {
        velocity = velocity - 0.01;
      }
      //Tilt
      if (angle !== 0 && keyIsPressed && keyCode === DOWN_ARROW) {
        // Calculate the changes in x and y based on the angle
        let direction = angle > 0 ? 1 : -1; // Determine the direction of rotation
        let deltaX = superd * direction * cos(abs(angle));
        let deltaY = superd * direction * sin(abs(angle));
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
          angle += 0.04;
          if (angle > PI / 4) {
            angle = PI / 4;
          }
        }
        if (keyCode === LEFT_ARROW) {
          angle -= 0.04;
          if (angle < -PI / 4) {
            angle = -PI / 4;
          }
        }
      }
    }

    if (angle > PI / 4) {
      ufoX = ufoX + superd; // Öka x-värdet med hastigheten
      ufoY = ufoY + superd; // Öka y-värdet med hastigheten
    }
    textSize(20);
    text("Speed: " + velocity.toFixed(2), 10, 30);
    if (ufoY > 360 || ufoY < -190) {
      gameIsRunning = false;
      console.log("Game over");
      fill(255);
    }
  }
  if (velocity > 2 && ufoY > 360) {
    console.log("crash");
  }
}

function overScreen() {
  background(230, 21, 20);
  text("Result", 250, 200);
  for (let star of stars) {
    fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
    ellipse(star.x, star.y, 3);
    // Flashing
    star.alpha = star.alpha + 0.02;
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
