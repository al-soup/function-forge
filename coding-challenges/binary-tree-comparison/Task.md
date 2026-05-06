# Comparison of Two B-Trees

## Task

Create a function that compares two binary trees if they are identical in strucute and values.

```ts
export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
  // TODO implement
}
```

## Hints

The tree follows this signature:

```ts
type BinaryNode<T> = {
  left: BinaryNode<T> | null;
  right: BinaryNode<T> | null;
  value: T;
};
```
