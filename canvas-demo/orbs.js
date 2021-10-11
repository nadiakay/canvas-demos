var orbsCanvas = document.createElement("canvas");
var orbsCtx = orbsCanvas.getContext("2d");
var w = (orbsCanvas.width = window.innerWidth);
var h = (orbsCanvas.height = window.innerHeight);
document.body.appendChild(orbsCanvas);

var orbs = [];
//for i in n orbs.push({center point, radius})
for (i = 0; i < 8; i++) {
  orbs.push({ center: getCenter(), radius: Math.random() * 40 });
}

init();

function init() {
  orbsCtx.strokeStyle = "white";
  var i = orbs.length;
  while (i--) {
    drawOrb(orbs[i].center, orbs[i].radius);
  }
}

function render() {
  orbsCtx.clearRect(0, 0, w, h);

  var i = orbs.length;
  while (i--) {
    drawOrb(orbs[i].center, orbs[i].radius);
  }
}

function drawOrb(center, radius) {
  console.log(center);
  console.log(radius);
  orbsCtx.beginPath();
  orbsCtx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
  orbsCtx.fill();
  orbsCtx.stroke();
}

function getCenter() {
  var x = Math.random() * w;
  var y = (Math.random() * h) / 2;
  return [x, y];
}
