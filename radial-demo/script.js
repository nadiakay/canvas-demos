var ctx = document.getElementById("canvas").getContext("2d");
var table = document.getElementById("table");

var p = { x: 200, y: 200 },
  radius = 200;

function drawRad(angle) {
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(p.x + Math.sin(angle) * radius, p.y + Math.cos(angle) * radius);
  ctx.stroke();

  updateTable(angle);
}

function getRandomAngle() {
  return (Math.floor(Math.random() * 360) * Math.PI) / 180;
}

function radDrawer() {
  ctx.clearRect(0, 0, 400, 400);
  drawRad(getRandomAngle());
  window.requestAnimationFrame(radDrawer);
}

function updateTable(val) {
  var row = document.createElement("tr");
  row.innerHTML = val;
  table.appendChild(row);
  if (table.rows.length > Math.floor(Math.random() * 20))
    table.removeChild(table.childNodes[0]);
  if (Math.floor(Math.random() * 10) == 1) table.innerHTML = "";
}

function init() {
  ctx.strokeStyle = "white";
  window.requestAnimationFrame(radDrawer);
}

init();
