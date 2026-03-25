export type Point = { x: number; y: number };

type Maze = string[];
// const example: Maze = [
//   '####e#',
//   '#    #',
//   '# ####',
//   '#s####'
// ]

// all for directions that are tried from one position
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function walk(
  maze: Maze,
  wall: string,
  curr: Point,
  end: Point,
  seen: boolean[][],
  path: Point[],
): boolean {
  // 1. Base Case:
  // Are we off the map?
  if (
    curr.x < 0 ||
    curr.x >= maze[0].length ||
    curr.y < 0 ||
    curr.y >= maze.length
  ) {
    return false;
  }

  // Is the position a wall?
  if (maze[curr.y][curr.x] === wall) {
    return false;
  }

  // Are we at the end?
  if (curr.x === end.x && curr.y === end.y) {
    // push in the ending tile because we stopped the recursion
    path.push(end);
    return true;
  }

  // Have we seen this this position before?
  if (seen[curr.y][curr.x]) {
    return false;
  }

  // 2. The Recurse
  // 2.1 Pre - try a new position
  seen[curr.y][curr.x] = true;
  path.push(curr);

  // 2.2 Recurse
  for (let i = 0; i < directions.length; i++) {
    const [x, y] = directions[i];
    if (walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)) {
      // if we find the end - stop recursing
      return true;
    }
  }

  // 2.3 Post - we did not find the end in our current position
  path.pop();
  return false;
}

export const solveMaze = (
  maze: Maze,
  wall: string,
  start: Point,
  end: Point,
): Point[] => {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; ++i) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  walk(maze, wall, start, end, seen, path);

  return path;
};
