var canvas = document.getElementById("maze");
var ctx = canvas.getContext("2d");

var rows = parseInt(document.getElementById("rows").value);
var cols = parseInt(document.getElementById("cols").value);
var start = document.getElementById("start").value;
var end = document.getElementById("end").value;
var walls = new Set();

var dragging = false;

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      if ([r, c].toString() == start) {
        ctx.fillStyle = "green";
      } else if ([r, c].toString() == end) {
        ctx.fillStyle = "red";
      } else if (walls.has([r, c].toString())) {
        ctx.fillStyle = "black";
      } else {
        ctx.fillStyle = "white";
      }
      ctx.fillRect(c*50, r*50, 50, 50);
      ctx.strokeStyle = "gray";
      ctx.strokeRect(c*50, r*50, 50, 50);
    }
  }
}

function getPosition(event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  var row = Math.floor(y / 50);
  var col = Math.floor(x / 50);
  return [row, col];
}

canvas.addEventListener("mousedown", function(event) {
  var pos = getPosition(event);
  var row = pos[0];
  var col = pos[1];
  var key = [row, col].toString();
  if (key == start || key == end) {
    dragging = key;
  } else if (walls.has(key)) {
    walls.delete(key);
  } else {
    walls.add(key);
  }
  draw();
});

canvas.addEventListener("mousemove", function(event) {
  if (!dragging) {
    return;
  }
  var pos = getPosition(event);
  var row = pos[0];
  var col = pos[1];
  var key = [row, col].toString();
  if (key == start || key == end) {
    return;
  }
  if (dragging == "start") {
    start = key;
  } else if (dragging == "end") {
    end = key;
  } else {
    walls.delete(dragging);
    walls.add(key);
    dragging = key;
  }
  draw();
});

canvas.addEventListener("mouseup", function(event) {
  dragging = false;
});

draw();
