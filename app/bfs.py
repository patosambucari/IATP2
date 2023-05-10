from collections import deque

def bfs(maze):
    start_node = maze.start
    goal_node = maze.end
    visited = set()
    queue = deque([(start_node, [start_node])])
    while queue:
        current_node, path = queue.popleft()
        if current_node == goal_node:
            return path
        if current_node in visited:
            continue
        visited.add(current_node)
        for neighbor in maze.neighbors(*current_node):
            queue.append((neighbor, path + [neighbor]))
    return None
