let stars = [];
function setup(){
    createCanvas(590, 500);
    background(255); 

    textSize(22); // Set text size
    textFont('Arial'); // Set text font

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
function ufo(x, y){
    push();
    translate(x, y);
    rotate(angle); // Rotate the UFO based on angle
    drawSmoke(0, smokeY);
    fill(255, 0, 0);
    rect(0 -18, 0, 36, 70);
    fill(255, 255, 255, 160);
    ellipse(0, 40, 25);
    fill(0, 255, 0); 
    ellipse(0, 45, 15);
    fill(0, 0, 0);
    ellipse(-4, 45, 5);
    ellipse(4, 45, 5);
pop(); 
}
let smokeY = 90; // Initial position of smoke relative to UFO
// Funktion för att rita rökmoln
function drawSmoke(x, y) {
  fill(255, 255, 0); 
  ellipse(x, y, 30, 50); 
}

let ufoY = 100;
let ufoX = 200;
let velocity = 1;  
const acceleration = 0.1;
let angle = 0; 
let gameIsRunning = true;

    //start 
    function startScreen(){
        background(0, 0, 255);
        noStroke();
        for (let star of stars) {
            fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
            ellipse(star.x, star.y, 3);
            // Flashing
            star.alpha = star.alpha + 0.04;
          }
        text("Start, do not crash", 200, 200);
        text("Click to start", 230, 240);
    } 
    //game 
    function gameScreen(){
        background(0, 111, 240);
        noStroke();
          //
          fill (80,250,80);
          ellipse(100, 80, 60); 
        //stars
        for (let star of stars) {
          fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
          ellipse(star.x, star.y, 3);
          // Flashing
          star.alpha = star.alpha + 0.04;
        }
        //
        // Kroppen på satelliten
  fill(100);
  ellipse(340, 100, 30, 40);
  
  // Antenn
  fill(150);
  rect(335, 90, 10, 5);
  
  // Solpaneler
  fill(255, 255, 0);
  rect(330, 115, 20, 5);
  
  // Antenn på solpanelerna
  fill(150);
  rect(328, 120, 24, 3);
      
        //ground
        fill (255,255,102);
        rect(0, 420, 600, 200); 
        //crates
        fill(255,205,100);
        ellipse(50, 430, 60, 20); 
        ellipse(170, 430, 80, 20); 
        ellipse(300, 430, 50, 20); 
        ellipse(420, 430, 110, 20); 

        push(); // Spara nuvarande transformationsmatris
        translate(ufoX, ufoY);
        rotate(angle); // Använd vinkeln för rotation
        ufo(0, 0); // Ritar UFO relativt till den övre vänstra hörnet av UFO
        pop(); // Återställ transformationsmatrisen för att undvika att påverka andra ritningar
       
      
        if (gameIsRunning === true){   
            ufoY = ufoY + velocity; 
            velocity = velocity + acceleration;  
           if (keyIsPressed && keyCode === DOWN_ARROW) {
    smokeY = 70;
  } else {
    smokeY = 40;
  }
            //Up
            if(keyIsPressed){  
                if(keyCode === DOWN_ARROW){ 
                velocity = velocity - 0.3; 
                
                } 
                  //Tilt
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

            if (angle > PI / 4){
                ufoX = ufoX + superd; // Öka x-värdet med hastigheten
                ufoY = ufoY + superd; // Öka y-värdet med hastigheten
            }
            textSize(20);
                text("Speed: " + velocity.toFixed(2), 10, 30);
            if(ufoY > 360 || ufoY < -190){
                gameIsRunning = false; 
                console.log("Game over");
                fill(255);
                textSize(20);
                text("Final velocity: " + velocity.toFixed(2), 10, 30); // Visa hastigheten i övre vänstra hörnet
            }
          } 
        if (velocity > 2 && ufoY > 360){
            console.log("crash");
        }
    }
    function overScreen(){
        background(200, 71, 90);
        text("Result", 250, 200); 
        for (let star of stars) {
            fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
            ellipse(star.x, star.y, 3);
            // Flashing
            star.alpha = star.alpha + 0.04; 
          }
        
    } 
 
    let state = "start"; 
 
    function draw() { 
        if (state === "start") {
            startScreen();
        }
        else if(gameIsRunning === true) {
            gameScreen();
        }
        else if(state === "result"){ 
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

  