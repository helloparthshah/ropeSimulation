// For it to run you need a local server (check: https://github.com/processing/p5.js/wiki/Local-server)
let ropes = [];
let dragging = -1;
let vert = -1;

function setup() {
  // put setup code here
  h1 = createElement("h1", "Rope simulation based on verlet integration");
  createCanvas(800, 800);
  document.oncontextmenu = function () {
    return false;
  };
}

function mousePressed() {
  if (mouseButton === LEFT) {
    for (let i = 0; i < ropes.length; i++) {
      let ind = ropes[i].isPressed(mouseX, mouseY);
      if (ind != -1) {
        dragging = i;
        vert = ind;
        return;
      }
    }
  }
  dragging = -1;
}

function mouseClicked() {
  if (dragging == -1)
    ropes.push(new Rope(20, 20, createVector(mouseX, mouseY)));
}

function draw() {
  // put drawing code here
  background(220);
  if (mouseIsPressed) {
    if (dragging >= 0) ropes[dragging].move(mouseX, mouseY, vert);
    if (mouseButton === RIGHT) {
      for (let i = 0; i < ropes.length; i++) {
        let ind = ropes[i].isPressed(mouseX, mouseY);
        if (ind != -1) {
          ropes[i].break(ind);
        }
      }
    }
  }
  for (let i = 0; i < ropes.length; i++) {
    ropes[i].display();
    ropes[i].update();
  }
}
