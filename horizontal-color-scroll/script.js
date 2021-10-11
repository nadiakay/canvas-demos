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
  var ticks = 0;
  var timer = setInterval(render, 1000 / 30);
}

function render() {
  ctx.clearRect(0, 0, w, h);

  var i = horizontals.length;
  while (i--) {
    var horizontal = horizontals[i];
    var scale = fov / (fov + horizontal.z);
    var y2d = horizontal.y * scale + h / 2;
    drawHorizontal(y2d, i);

    horizontal.z -= 1;
    if (horizontal.z < -fov) horizontal.z += 2 * fov;
  }
}
function drawHorizontal(y, color) {
  var rgbVals = hslToRgb(color / 100, 1, 0.5);
  ctx.strokeStyle = `rgb(${rgbVals[0]}, ${rgbVals[1]}, ${rgbVals[2]})`;
  ctx.beginPath();
  ctx.moveTo(0, Math.floor(y));
  ctx.lineTo(w, Math.floor(y));
  ctx.stroke();
}

function hslToRgb(h, s, l) {
  //https://gist.github.com/mjackson/5311256

  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [r * 255, g * 255, b * 255];
}
