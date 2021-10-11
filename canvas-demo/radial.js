var radial = document.createElement("canvas");
var radialCtx = radial.getContext("2d");
var w = (radial.width = window.innerWidth);
var h = (radial.height = window.innerHeight);
document.body.appendChild(radial);

var table = document.createElement("table");
document.body.appendChild(table);

var r = h / 4;
var p = { x: r, y: r };

function init() {
  radialCtx.strokeStyle = "white";
  window.requestAnimationFrame(radDrawer);
}

init();

function radDrawer() {
  radialCtx.clearRect(0, 0, w, h);
  drawRad(getRandomAngle());
  if (Math.floor(Math.random() * 20) == 3) getRandomRadius();
  window.requestAnimationFrame(radDrawer);
}

function drawRad(angle) {
  radialCtx.beginPath();
  radialCtx.moveTo(p.x, p.y);
  radialCtx.lineTo(p.x + Math.sin(angle) * r, p.y + Math.cos(angle) * r);
  radialCtx.stroke();

  updateTable(angle);
}

function getRandomAngle() {
  return (Math.floor(Math.random() * 360) * Math.PI) / 180;
}

function getRandomRadius() {
  newR = r * (Math.random() * 4);
  if (newR < h / 2 && newR > 20) r = newR;
  p = { x: r, y: r };
}

function updateTable(val) {
  var row = document.createElement("tr");
  row.innerHTML = val;
  table.appendChild(row);
  if (table.rows.length > Math.floor(Math.random() * 20))
    table.removeChild(table.childNodes[0]);
  if (Math.floor(Math.random() * 10) == 1) table.innerHTML = "";
}
