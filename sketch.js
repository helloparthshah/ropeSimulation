// For it to run you need a local server (check: https://github.com/processing/p5.js/wiki/Local-server)
let ropes = [];
let dragging = -1;
let vert = -1;
let cloth;

let isClothMode = true;

function setup() {
  // put setup code here
  h1 = createElement("h1", "Rope simulation based on verlet integration");
  createCanvas(800, 800);
  document.oncontextmenu = function () {
    return false;
  };
  cloth = new Cloth(30, 20, createVector(50, 50));

  button = createButton("Rope mode");
  button.mousePressed(toggle);
}

function toggle() {
  if (isClothMode) {
    button.html("Cloth Mode");
    cloth = null;
    ropes.push(new Rope(20, 20, createVector(100, 100)));
    isClothMode = false;
  } else {
    button.html("Rope Mode");
    ropes = [];
    cloth = new Cloth(30, 20, createVector(50, 50));
    isClothMode = true;
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    if (!isClothMode) {
      for (let i = 0; i < ropes.length; i++) {
        let ind = ropes[i].isPressed(mouseX, mouseY);
        if (ind != -1) {
          dragging = i;
          vert = ind;
          return;
        }
      }
    }
    l = cloth.isPressed(mouseX, mouseY);
    if (l[0] != -1) {
      dragging = l[0];
      vert = l[1];
      return;
    }
  }
  dragging = -1;
}

function mouseClicked() {
  if (!isClothMode)
    if (dragging == -1)
      ropes.push(new Rope(20, 20, createVector(mouseX, mouseY)));
}

function draw() {
  // put drawing code here
  background(220);

  if (mouseIsPressed) {
    if (!isClothMode && dragging >= 0)
      ropes[dragging].move(mouseX, mouseY, vert);
    if (isClothMode && dragging >= 0)
      cloth.move(mouseX, mouseY, dragging, vert);
    if (mouseButton === RIGHT) {
      if (!isClothMode)
        for (let i = 0; i < ropes.length; i++) {
          ropes[i].break(mouseX, mouseY);
        }
      if (isClothMode) {
        cloth.break(mouseX, mouseY);
      }
    }
  }

  for (let i = 0; i < ropes.length; i++) {
    ropes[i].display();
    ropes[i].update();
  }
  if (cloth) {
    cloth.display();
    cloth.update();
  }
}
