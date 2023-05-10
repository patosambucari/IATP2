class Maze:
    def __init__(self, rows, cols, start, end, walls):
        self.rows = rows
        self.cols = cols
        self.start = start
        self.end = end
        self.walls = walls

    def is_wall(self, row, col):
        return (row, col) in self.walls

    def neighbors(self, row, col):
        result = []
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            r = row + dr
            c = col + dc
            if 0 <= r < self.rows and 0 <= c < self.cols and not self.is_wall(r, c):
                result.append((r, c))
        return result

    def heuristic(self, node):
        return abs(node[0] - self.end[0]) + abs(node[1] - self.end[1])

    
