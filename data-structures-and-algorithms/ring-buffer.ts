/**
 * A ring buffer is a data structure where operations like pushing, popping, shifting, and unshifting are O(1), using modulo arithmetic
 * to wrap around an array. It maintains order by using head and tail indices that can move circularly within a fixed-size array.
 *
 * The modulo operator helps calculate the actual index within the array by taking the remainder when an index exceeds the array's length.
 * For example, if the array size is 10 and the tail is 12, 12 modulo 10 would be 2, wrapping the index back to the beginning of the array.
 *
 * When a ring buffer needs to resize, it creates a new larger buffer, starting at the head and copying elements in order. The head will
 * be set to 0, and the tail will be set to the current length, allowing for additional capacity and continued circular operations.
 */
export class RingBuffer<T> {
  public length: number;
  private capacity: number;
  private list: Array<T | undefined>;
  private head: number;
  private tail: number;

  constructor(capacity: number = 16) {
    this.capacity = capacity;
    this.length = 0;
    this.head = 0;
    this.tail = 0;
    this.list = Array.from({ length: capacity }, () => undefined);
  }

  push(element: T) {
    if (this.length === this.capacity) {
      const newCapacity = this.capacity + 1;
      const newList: Array<T | undefined> = Array.from(
        { length: newCapacity },
        () => undefined,
      );

      for (let i = 0; i < this.length; i++) {
        const actualIdx = (this.head + i) % this.capacity;
        newList[i] = this.list[actualIdx];
      }

      this.list = newList;
      this.head = 0;
      this.tail = this.length;
      this.capacity = newCapacity;
    }

    this.list[this.tail] = element;
    this.tail = (this.tail + 1) % this.capacity;
    this.length++;
  }

  pop(): T | undefined {
    if (this.length === 0) return undefined;

    const element = this.list[this.head];
    this.list[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.length--;

    return element;
  }

  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) return undefined;

    const actualIdx = (this.head + idx) % this.capacity;
    return this.list[actualIdx];
  }
}
