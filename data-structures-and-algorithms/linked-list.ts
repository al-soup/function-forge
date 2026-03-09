type Node<T> = {
  value: T;
  next?: Node<T>;
};

// A Queue is a specific implementation of a Linked-List. FIFO singly Linked-List
export default class Queue<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T): void {
    this.length++;
    const node: Node<T> = { value: item };

    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  deque(): T | undefined {
    if (!this.head) return undefined;

    this.length--;
    const currentHead = this.head;
    this.head = this.head?.next;
    // not actually needed in JS but in other langs you might need to free up memory
    currentHead.next = undefined;

    if (this.length === 0) {
      this.tail = undefined;
    }

    return currentHead.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
