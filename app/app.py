from flask import Flask, render_template, request
from maze import Maze
from bfs import bfs
from astar import astar

app = Flask(__name__)
app.template_folder = "templates"

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/solve", methods=["POST"])
def solve():
    rows = int(request.form["rows"])
    cols = int(request.form["cols"])
    start = tuple(map(int, request.form["start"].split(",")))
    end = tuple(map(int, request.form["end"].split(",")))
    walls = set(map(tuple, request.form.getlist("walls")))
    maze = Maze(rows, cols, start, end, walls)
    bfs_solution = bfs(maze)
    astar_solution = astar(maze)
    return render_template("solve.html", bfs_solution=bfs_solution, astar_solution=astar_solution, rows=rows, cols=cols, start=start, end=end, walls=list(walls))

if __name__ == "__main__":
    app.run(debug=True)
