function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255,255,0);
}


function draw() {
  fill(255);
  stroke(0,5);
  textSize(50);
  textAlign(CENTER);
  text('Alvin',1/2*width, 3.35/4*height);
  stroke(0);
  strokeWeight(5);
  arc(1/2*width, 1/2*height, 500, 500, 0, 2*PI, OPEN);
  arc(1/2*width, 2.5/4*height, 50, 50, -0.5, PI+0.5, CHORD);
  arc(2.25/4*width, 2/4*height-10, 100, 100, -0.5, PI+0.5, CHORD);
  arc(1.75/4*width, 2/4*height-10, 100, 100, -0.5, PI+0.5, CHORD);
  arc(1/2*width, 3/4*height, 1200, 500, PI+1.34, PI+1.8, OPEN);
  arc(2.7/4*width, 2.97/4*height, 1200, 500, PI+1.03, PI+1.37, OPEN);
  arc(1.3/4*width, 2.97/4*height, 1200, 500, 0-1.37, 0-1.03, OPEN);
  fill(0,0,0,0)
  arc(3.4/4*width, 1/4*height, 1200, 500, 3.33/4*PI, PI-0.06, OPEN);
  arc(3.4/4*width, 0.8/4*height, 1200, 500, 3.37/4*PI, PI-0.06, OPEN);
  arc(0.6/4*width, 1/4*height, 1200, 500, 0, 1.33/4*HALF_PI, OPEN);
  arc(0.6/4*width, 0.8/4*height, 1200, 500, 0+0.06, 1.28/4*HALF_PI, OPEN);
  fill(0,0,0,255)
  circle(2.25/4*width, 2/4*height, 50);
  circle(1.75/4*width, 2/4*height, 50);
}
