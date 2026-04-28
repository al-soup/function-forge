import path from "node:path";

export type BinaryNode<T> = {
  value: T;
  left: BinaryNode<T> | null;
  right: BinaryNode<T> | null;
};

/**
 * Tree Traversal
 *
 * This is a depth-first traversal, because we are trying to go down as far as possible (left)
 * before visiting the node
 *
 * @returns the visited nodes
 */
export function preOrderSearch(head: BinaryNode<number>): number[] {
  return walk(head, []);

  // In case we didn't want to return `path` in `walk` this would look something like this:

  // const path: number[] = []
  // walk(head, path)
  // return path

  // walk would return void and the base case just an empty return. Returning the path makes it more convenient.
}

function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
  // Our base case: we go to a node that does not exist
  if (!curr) {
    return path;
  }

  // How we recurse:
  // Step 1. pre
  path.push(curr.value);

  // Step 2. recurse
  // in trees you always first walk left, then right as a convention
  walk(curr.left, path);
  walk(curr.right, path);

  // Step 3. post
  // nothing to do in post. When we are at a node that does not exist we are at our base case.
  // So the last thing to do is just to return the traversed path
  return path;

  // --- InOderSearch ---
  // Going down the left until we no longer can go left. Then we visit the node and then we go right.

  // pre

  // recurse
  // walk(curr.left, path);
  // path.push(curr.value);
  // walk(curr.right, path);

  // post
  // return path;

  // --- PostOderSearch ---
  // This would be:

  // pre

  // recurse
  // walk(curr.left, path);
  // walk(curr.right, path);

  // post
  // path.push(curr.value);
  // return path;
}
