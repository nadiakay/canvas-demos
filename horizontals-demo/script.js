var canvas = document.createElement("canvas");
var w = (canvas.width = window.innerWidth);
var h = (canvas.height = window.innerHeight);
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

var fov = 250;

var horizontals = [];
for (var z = -250; z < 250; z += 5) horizontals.push({ y: 40, z: z });

init();

function init() {
  ctx.strokeStyle = "white";
  setInterval(render, 1000 / 30);
}

function render() {
  ctx.clearRect(0, 0, w, h);

  var i = horizontals.length;
  while (i--) {
    var horizontal = horizontals[i];
    var scale = fov / (fov + horizontal.z);
    var y2d = horizontal.y * scale + h / 2;
    drawHorizontal(y2d);

    horizontal.z -= 1;
    if (horizontal.z < -fov) horizontal.z += 2 * fov;
  }
}
function drawHorizontal(y) {
  ctx.beginPath();
  ctx.moveTo(0, Math.floor(y));
  ctx.lineTo(w, Math.floor(y));
  ctx.stroke();
}
