document.getElementById("solve-bfs").addEventListener("click", solveBFS);
document.getElementById("solve-astar").addEventListener("click", solveAStar);

var canvas = document.getElementById("maze");
var ctx = canvas.getContext("2d");

var rows = parseInt(document.getElementById("rows").value);
var cols = parseInt(document.getElementById("cols").value);
var start = document.getElementById("start").value;
var end = document.getElementById("end").value;
var walls = new Set();

var dragging = false;

function solveBFS() {
  // Obtener los valores de las entradas del usuario
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const walls = getWalls();
  // Enviar una solicitud POST al servidor para resolver el laberinto con BFS
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/solve", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    // Analizar la respuesta JSON del servidor
    const solution = JSON.parse(xhr.responseText);
    // Dibujar el laberinto y la solución con BFS
    drawMaze(rows, cols, start, end, walls, solution.bfs_solution, solution.astar_solution);
  };
  xhr.onerror = function () {
    console.error("Error al resolver el laberinto con BFS");
  };
  xhr.send(JSON.stringify({ rows: rows, cols: cols, start: start, end: end, walls: walls, algorithm: "bfs" }));
}

function solveAStar() {
  // Obtener los valores de las entradas del usuario
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const walls = getWalls();
  // Enviar una solicitud POST al servidor para resolver el laberinto con A*
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/solve", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    // Analizar la respuesta JSON del servidor
    const solution = JSON.parse(xhr.responseText);
    // Dibujar el laberinto y la solución con A*
    drawMaze(rows, cols, start, end, walls, solution.bfs_solution, solution.astar_solution);
  };
  xhr.onerror = function () {
    console.error("Error al resolver el laberinto con A*");
  };
  xhr.send(JSON.stringify({ rows: rows, cols: cols, start: start, end: end, walls: walls, algorithm: "astar" }));
}


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
