
var data = [];
var width = 400, height = 400;
var m = 1, b = 0;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.position(0, 0);
  canvas.class("p5canvas");
}

function mousePressed() {
  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 1, 0);
  let point = createVector(x, y);
  data.push(point);
}

function draw() {
  background(0);

  for (let p of data) {
    let x = map(p.x, 0, 1, 0, window.innerWidth);
    let y = map(p.y, 0, 1, window.innerHeight, 0);
    fill(255);
    stroke(255);
    ellipse(x, y, 8, 8);
  }
  if (data.length > 0){
    linearRegression();
    drawLine();
  }
  
}

function linearRegression(){
  let xsum = 0;
  let ysum = 0;

  for(var p of data){
    xsum += p.x;
    ysum += p.y;
  }

  let xmean = xsum / data.length;
  let ymean = ysum / data.length;

  let num = 0;
  let den = 0;
  for (var p of data){
    num += (p.x - xmean) * (p.y - ymean);
    den += (p.x - xmean) * (p.x - xmean);
  }

  m = num / den;
  b = ymean - m * xmean;
}

function drawLine() {
  let x1 = 0;
  let y1 = m * x1 + b;
  let x2 = 1;
  let y2 = m * x2 + b;

  x1 = map(x1, 0, 1, 0, window.innerWidth);
  x2 = map(x2, 0, 1, 0, window.innerWidth);
  y1 = map(y1, 0, 1, window.innerHeight, 0);
  y2 = map(y2, 0, 1, window.innerHeight, 0);

  stroke(255, 0, 255);
  line(x1, y1, x2, y2);
}



window.onresize = function () {
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.size(w, h);
  width = w;
  height = h;
}