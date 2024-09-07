// Differential directions
// These will be added to the current point in order to check all 4 directions
const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

// You can add more parameters to the function that will recurse
function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    // 1. Base Case

    // off the map
    // NOTE: we don't wanna go off the bounds of the array
    // Even though you can do that in JS/TS, it's a good practice, because traditional languages will throw an error
    // That's why we start from this case first
    if (curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze.length) {

        return false;
    }

    // on a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // end
    if (curr.x === end.x && curr.y === end.y) {
        // Important! We need to push the end, since we've found it
        path.push(end);
        return true;
    }

    // we've seen this tile
    if (seen[curr.y][curr.x]) {
        // We don't want to recurse on places we've already been
        return false;
    }

    // 2. Recursion Case
    // 3 steps
    // pre
    // recurse
    // post

    // pre
    seen[curr.y][curr.x] = true;
    path.push(curr);

    // recurse
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];

        if (walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)) {
            // We return true, if we find the end, and we need to stop recursing at that point
            // So we need to return true here as well
            return true;
        } 
    }

    // post
    // We don't want to add a point that doesn't direct to the end
    path.pop();

    // We've reached the end of maze
    // And we didn't find the end from the maze, we return false
    return false;
}

// The entrance to the recursive function, like this function solve, isn't the one you want to recurse in
// So create a new function
export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}