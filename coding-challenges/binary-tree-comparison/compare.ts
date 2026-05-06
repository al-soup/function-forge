export type BinaryNode<T> = {
  right: BinaryNode<T> | null;
  left: BinaryNode<T> | null;
  value: T;
};

export default function compare(
  a: BinaryNode<number> | null,
  b: BinaryNode<number> | null,
): boolean {
  // base case 1
  // Have we recursed to a point in both subtrees from which we both cannot recurse any further?
  // e.g. they both don't have a child on the right
  if (a === null && b === null) {
    return true;
  }

  // base case 2
  // The two trees differ in structure: one is at a node while the other is not
  if (a === null || b === null) {
    return false;
  }

  // base case 3
  // the structure is correct but the values differ
  if (a.value !== b.value) {
    return false;
  }

  // As long as we only hit the return `true` it will be bubbling back up in the stack and take the next path
  return compare(a.left, b.left) && compare(a.right, b.right);
}
