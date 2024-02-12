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
    //saucer
    fill(255, 0, 0);
    rect(0 -17, 0, 36, 70);
    fill(255, 255, 255, 160);
    ellipse(0, 20, 25);
    fill(0, 255, 0); 
    ellipse(0, 25, 15);

    //glass dome
fill(255, 255, 255, 160);
beginShape(); 
vertex(-20, 0);
bezierVertex(-20, 5, 20, 5, 20, 0);
bezierVertex(20, -40, -20, -40, -20, 0);
endShape();
pop();
}

let ufoY = 100;
let ufoX = 200;
let velocity = 1; 
const acceleration = 0.1;
let angle = 0; // Angle of rotation for UFO
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
        //stars
        for (let star of stars) {
          fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
          ellipse(star.x, star.y, 3);
          // Flashing
          star.alpha = star.alpha + 0.04;
        }
        //ground
        fill (255,255,102);
        rect(0, 420, 600, 200); 
        //crate
        fill(255,205,100);
        ellipse(50, 430, 60, 20); 
       
        ufo(ufoX,ufoY); 
  
        if (gameIsRunning === true){ 
            ufoY = ufoY + velocity; 
            velocity = velocity + acceleration;  
        
            if(keyIsPressed){  
                if(keyCode === UP_ARROW){ 
                velocity = velocity - 0.3;
                } 
            } 
         
            if(ufoY > 370){
                gameIsRunning = false; 
                console.log("Game over");
            }
          }
           // Calculate angle between UFO and mouse
    //let targetAngle = atan2(mouseY - ufoY, mouseX - 150);
    //let angleDiff = targetAngle - angle;
    // Smoothing the rotation
    //angle += angleDiff * 0.06; 
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

    function mouseClicked(){
        if (state === "start"){
            state= "game";
        }
        else if( state === "game"){
            state = "result";
        }
        else if (state === "result")
        {
            state = "game";
        }
    }