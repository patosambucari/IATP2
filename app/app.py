from flask import Flask, render_template, request
from maze import Maze
from bfs import bfs
from astar import astar

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve', methods=['POST'])
def solve():
    # Obtener la configuración del laberinto de la solicitud POST
    rows = int(request.form['rows'])
    cols = int(request.form['cols'])
    start = tuple(map(int, request.form['start'].split(',')))
    end = tuple(map(int, request.form['end'].split(',')))
    walls = []
    for key, value in request.form.items():
        if key.startswith('wall-'):
            walls.append(tuple(map(int, value.split(','))))

    # Crear el laberinto y resolverlo usando BFS
    maze = Maze(rows, cols, start, end, walls)
    bfs_solution = bfs(maze)

    # Resolver el laberinto usando A*
    astar_solution = astar(maze)

    # Renderizar la plantilla con las soluciones y la configuración del laberinto
    return render_template('solve.html', rows=rows, cols=cols, start=start, end=end, walls=walls,
                           bfs_solution=bfs_solution, astar_solution=astar_solution)
