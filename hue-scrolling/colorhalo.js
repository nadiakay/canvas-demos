var canvas = document.createElement("canvas");
var w = (canvas.width = window.innerWidth);
var h = (canvas.height = window.innerHeight);
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
var table = document.createElement("table");
document.body.appendChild(table);

var colorIndex = 0;
var tableCounter = 0;
init();

function init() {
  ctx.globalAlpha = 0.2;
  setTimeout(setInterval(render, 1000 / 20), 1000);
}

function render() {
  ctx.clearRect(0, 0, w, h);
  if (w > h) renderHalos(h / 2);
  else renderHalos(w / 2);
}

function renderHalos(r) {
  console.log(r);
  for (var i = 0; i < r; i++) {
    var rgbVals = hslToRgb((i / r + (colorIndex / 3125) * r) % 1, 1, 0.5);
    ctx.strokeStyle = `rgb(${rgbVals[0]}, ${rgbVals[1]}, ${rgbVals[2]})`;
    ctx.fillStyle = ctx.strokeStyle;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, r - i, 0, Math.PI * 2, true);
    ctx.fill();
    tableCounter++;
  }
  colorIndex++;
  if (colorIndex == r) colorIndex = 0;
}

function updateTable(dataString) {
  var row = document.createElement("tr");
  row.innerHTML = dataString;
  table.appendChild(row);
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
