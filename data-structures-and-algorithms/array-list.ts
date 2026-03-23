/**
 
 * Efficient in adding and removing from the end (push/pop) with O(1). If the ArrayList exceeds its capacity we usually double the capacity.
 * Inserting or deleting from the front or middle requires shifting all subsequent elements, resulting in an O(N) time complexity.
 * Push and pop at the end are O(1) operations, while enqueue and dequeue from the front require shifting all elements, making them O(N) operations
 * An ArrayList provides constant-time random access by index and efficient push/pop operations at the end, whereas a Linked List provides efficient insertion and deletion at any point
 */
export class ArrayList<T> {
  public length: number;
  public capacity: number;
  private list: Array<T | undefined>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.length = 0;
    this.list = Array.from({ length: capacity }, (_) => undefined);
  }

  append(element: T) {
    if (this.length + 1 > this.capacity) this.doubleCapacity();

    this.list[this.length] = element;
    this.length++;
  }

  prepend(element: T) {
    if (this.length + 1 > this.capacity) this.doubleCapacity();

    // start by assigning i=length which is the next free position
    for (let i = this.length; i > 0; i--) {
      this.list[i] = this.list[i - 1];
    }
    this.list[0] = element;
    this.length++;
  }

  remove(element: T): T | undefined {
    let idx = -1;
    let i = 0;
    while (i < this.length) {
      if (element === this.list[i]) {
        idx = i;
        break;
      }
      i++;
    }

    if (idx === -1) return;

    const result = this.removeAt(idx);

    return result;
  }

  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) return undefined;

    const element = this.list[idx];

    for (let i = idx; i < this.length; i++) {
      this.list[i] = this.list[i + 1];
    }
    this.length--;
    this.list[this.length] = undefined;

    return element;
  }

  get(idx: number): T | undefined {
    // Checking against length (instead of capacity) is the proper safeguard — it ensures you can only access indices that represent real, current items in the list, regardless of what garbage might be sitting in the backing array beyond that point.
    if (idx < 0 || idx > this.length - 1)
      throw new Error("ArrayList index out of bounds");

    return this.list[idx];
  }

  private doubleCapacity() {
    this.capacity = this.capacity * 2;
    const newList: Array<T | undefined> = Array.from(
      { length: this.capacity },
      () => undefined,
    );
    for (let i = 0; i < this.length; i++) {
      newList[i] = this.list[i];
    }
    this.list = newList;
  }
}
