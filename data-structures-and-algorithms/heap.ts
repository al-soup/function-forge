/**
 * Heap / Priority Queue
 * is a binary tree where every child and grand child is smaller (MaxHeap -> largest item on the top),
 * or larger (MinHeap) than the current node. This is called the "head condition".
 * A heap is always complete - there are no empty spaces in the tree and it is always completed left to right.
 * Whenever a node is added or deleted, the tee needs to be adjusted. There is no traversing the tree.
 * Heaps maintain a weak ordering: it's not perfectly ordered when you compare ancestors of sibling nodes, but
 * ancestors are ordered correctly.
 *
 * Priority Queues are stored as arrays where the top node is at index 0 and the next row of children follow left-to-right.
 *
 * To access a the left child of a node you can use the formula: 2 * (current index) + 1 to get it's index in the array.
 * To access a parent you can calculate the index with ((current index) - 1) / 2. In JS you have to "floor" the result
 * because division of numbers does not return an integer.
 *
 * The primary purpose of a heap data structure is efficiently retrieving the minimum or maximum element.
 *
 * The running time for deletion and insertion is always O(log n)
 */
export default class MinHeap {
  public length: number;
  private data: number[];

  constructor() {
    this.length = 0;
    this.data = [];
  }

  // put the new element at the last position and then heapify up
  insert(value: number): void {
    this.data[this.length] = value;
    this.heapifyUp(this.length);
    this.length++;
  }

  // often called "poll" or "pop"
  // deletion removes the head element, take the last array element and put it in the first position and then heapifyDown
  delete(): number {
    if (this.length === 0) {
      return -1;
    }

    const out = this.data[0];
    this.length--;

    if (this.length === 0) {
      this.data = [];
      return out;
    }

    this.data[0] = this.data[this.length];
    this.heapifyDown(0);

    return out;
  }

  private heapifyDown(idx: number): void {
    if (idx >= this.length) {
      return;
    }

    const lIdx = this.leftChild(idx);
    const rIdx = this.rightChild(idx);

    // check if we have more children
    if (lIdx >= this.length) {
      return;
    }

    const lV = this.data[lIdx];
    const rV = this.data[rIdx];
    const currentValue = this.data[idx];

    if (lV > rV && currentValue > rV) {
      this.data[idx] = rV;
      this.data[rIdx] = currentValue;
      this.heapifyDown(rIdx);
    } else if (rV > lV && currentValue > lV) {
      this.data[idx] = lV;
      this.data[lIdx] = currentValue;
      this.heapifyDown(lIdx);
    }
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) {
      return;
    }

    const parentIdx = this.parent(idx);
    const parentValue = this.data[parentIdx];
    const currentValue = this.data[idx];

    // Because we are a in a minHeap (smallest item at the top), the value needs to go up
    if (parentValue > currentValue) {
      // swap current with the parent
      this.data[idx] = parentValue;
      this.data[parentIdx] = currentValue;
      this.heapifyUp(parentIdx);
    }
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private leftChild(idx: number): number {
    return 2 * idx + 1;
  }

  private rightChild(idx: number): number {
    return 2 * idx + 2;
  }
}
