var sideCanvas = document.createElement("canvas");
var w = (sideCanvas.width = window.innerWidth);
var h = (sideCanvas.height = window.innerHeight);
var sideCtx = sideCanvas.getContext("2d");
document.body.appendChild(sideCanvas);

init();

function init() {
  setTimeout(setInterval(render, 1000 / 30), 10000);
}

function render() {
  ctx.clearRect(0, 0, w, h);
}
