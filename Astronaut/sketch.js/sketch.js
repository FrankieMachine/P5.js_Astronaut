var astronaut;
var meteor;
var moveAllowed;
var toFast;
var gas;
var button;

function setup() {
  button = createButton('Nochmal');
  button.mousePressed(Reset);
  createCanvas(640, 480);
  astronaut = new Astronaut();
  meteor = new Meteor();
  gas = new Gas();
  moveAllowed = 1;
  toFast = 0;
}

function draw() {
  background(0);
  fill(125);
  astronaut.show();
  astronaut.update();
  meteor.show();
  gas.show();

  if (astronaut.y > height - 140 && toFast == 0) {
    if (astronaut.velocity > 4) {
      moveAllowed = 0;
      toFast = 1;
    } else {
      moveAllowed = 0;
      toFast = 2;
    }
  }

  if (toFast == 1) {
    fill(255, 0, 0);
    rect(10, 10, 165, 30);
    textSize(20);
    fill(255, 255, 0);
    text("Zu harte Landung", 15, 30);
  } else if (toFast == 2) {
    fill(0, 255, 0);
    rect(10, 10, 140, 30);
    textSize(20);
    fill(125, 0, 125);
    text("Gut gemacht!", 15, 30);
  }

  if (keyIsDown(UP_ARROW) && moveAllowed == 1 && gas.empty == 0) {
    astronaut.up();
    gas.burn();
  }
}


function Astronaut() {
  this.x = width / 2 - 50;
  this.y = 40;
  this.head = 25;
  this.bdyH = 50;
  this.bdyW = 20;
  this.feetH = 10;
  this.feetW = 30;
  this.helmH = 30;
  this.helmW = 30;
  this.velocity = 0;
  this.gravity = 0.3;

  this.show = function() {
    noStroke();
    // Körper
    fill(200, 200, 200);
    rect(this.x + 5, this.y + 10, this.bdyW, this.bdyH);
    // Füße
    fill(150, 150, 150);
    rect(this.x, this.y + 50, this.feetW, this.feetH);
    // Körper/Füße teilen
    stroke(125);
    line(this.x + 15, this.y + 35, this.x + 15, this.y + 59);
    // Helm 
    fill(230, 230, 230);
    arc(this.x + 15, this.y - 4, 40, 40, PI - 0.7, 0.7, CHORD);
    // Gesicht
    fill(50, 50, 50);
    ellipse(this.x + 15, this.y - 5, this.head, this.head);
    noStroke();
    // Arme
    fill(150, 150, 150);
    // linker Arm
    rect(this.x - 4, this.y + 10, this.feetH, this.feetW - 5);
    // rechter Arm
    rect(this.x + 24, this.y + 10, this.feetH, this.feetW - 5);
  }

  this.update = function() {
    this.velocity += this.gravity / 2;
    this.y += this.velocity;

    if (this.y > height - 133) {
      this.y = height - 133;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  this.up = function() {
    this.velocity += -this.gravity * 1.5;
  }
}

function Meteor() {
  this.x = width / 2 + 30;
  this.y = height;
  this.w = 700;
  this.h = 150;

  this.show = function() {
    // Meteor
    fill(150, 150, 150);
    arc(this.x, this.y, this.w, this.h, PI, TWO_PI, CHORD);
    // Krater1
    fill(125, 125, 125);
    ellipse(this.x, this.y - 30, 50, 30);
    // Krater2
    fill(140, 140, 140);
    ellipse(this.x - 200, this.y - 40, 50, 30);
    // Krater3
    fill(100, 100, 100);
    ellipse(this.x + 200, this.y - 20, 50, 30);
    // Krater4
    fill(105, 105, 105);
    ellipse(this.x + 100, this.y - 50, 50, 30);
  }
}

function Gas() {
  this.x = width - 50;
  this.y = height / 4;
  this.w = 25;
  this.h = 200;
  this.usage = 2;
  this.empty = 0;

  this.show = function() {
    // Anzeige Rest-Sprit
    fill(200, 0, 0);
    rect(this.x, this.y, this.w, this.h);
    // Anzeige "Sprit"
    textSize(20);
    fill(200, 200, 0);
    rect(this.x - 10, height / 4 + 210, 50, 30);
    fill(0,0,255);
    text("Sprit", this.x -7, height / 4+ 232);
  }

  this.burn = function() {
    if (this.y < height / 4 + 200) {
      this.y += this.usage;
      this.h -= this.usage;
    } else if (this.y >= height / 4 + 200) {
      this.empty = 1;
    }
  }
}

function Reset(){
  createCanvas(640, 480);
  astronaut = new Astronaut();
  meteor = new Meteor();
  gas = new Gas();
  moveAllowed = 1;
  toFast = 0;
}