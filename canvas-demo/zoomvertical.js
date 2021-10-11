//use this in separate demo:
//modularize & create scaled copies fractally in topleft corner`

var zoom2 = document.createElement("canvas");
var w = (zoom2.width = window.innerWidth);
var h = (zoom2.height = window.innerHeight);
var zoom2Ctx = zoom2.getContext("2d");
document.body.appendChild(zoom2);

var fov = 250;

var verticals = [];
for (var z = -250; z < 250; z += 5) verticals.push({ x: 40, z: z });

init();

function init() {
  zoom2Ctx.strokeStyle = "white";
  setInterval(render, 1000 / 30);
}

function render() {
  zoom2Ctx.clearRect(0, 0, w, h);

  var i = verticals.length;
  while (i--) {
    var vertical = verticals[i];
    var scale = fov / (fov + vertical.z);
    var x2d = vertical.x * scale + w / 2;
    drawVertical(x2d);

    vertical.z -= 1;
    if (vertical.z < -fov) vertical.z += 2 * fov;
  }
}

function drawVertical(x) {
  zoom2Ctx.beginPath();
  zoom2Ctx.moveTo(Math.floor(x), 0);
  zoom2Ctx.lineTo(Math.floor(x), h);
  zoom2Ctx.stroke();
}
