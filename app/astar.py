from queue import PriorityQueue

def astar(maze):
    start_node = maze.start
    goal_node = maze.end
    visited = set()
    frontier = PriorityQueue()
    frontier.put((0, start_node, [start_node]))
    while not frontier.empty():
        _, current_node, path = frontier.get()
        if current_node == goal_node:
            return path
        if current_node in visited:
            continue
        visited.add(current_node)
        for neighbor in maze.neighbors(*current_node):
            priority = len(path) + maze.heuristic(neighbor)
            frontier.put((priority, neighbor, path + [neighbor]))
    return None
