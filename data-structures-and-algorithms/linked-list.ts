type Node<T> = {
  value: T;
  next?: Node<T>;
};

// A Queue is a specific implementation of a Linked-List. FIFO singly Linked-List.
// (+) You are faster adding or removing from the head an LinkedList than in an array. But you have to traverse the whole LinkedList (linear) if you randomly want to access an item.
// A -> B -> C -> D
// ^---head       ^---tail
export class Queue<T> {
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

  // return the next value without modifying the state
  peek(): T | undefined {
    return this.head?.value;
  }
}

// A Stack is just the reversed Queue. A LIFO singly Linked-List. You only add and remove from the head.
// push and pop are both constant time operations.
// A <- B <- C <- D
// ^---tail       ^---head
export class Stack<T> {
  public length: number;
  private head?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
  }

  push(item: T): void {
    this.length++;
    const node: Node<T> = { value: item };
    if (!this.head) {
      this.head = node;
      return;
    }

    // We could also use `.previous` instead of `.next` to be more in line with the diagram shown above.
    node.next = this.head;
    this.head = node;
  }

  pop(): T | undefined {
    this.length = Math.max(0, this.length - 1);
    if (this.length === 0) {
      const head = this.head;
      this.head = undefined;
      return head?.value;
    }

    const head = this.head as Node<T>;
    this.head = head.next;

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
