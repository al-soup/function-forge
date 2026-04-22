type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
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
// Terminology: head-operations are called push/pop while tail operations are called enqueue/deque.
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

interface LinkedList<T> {
  get length(): number;
  insertAt(item: T, index: number): void;
  remove(item: T): T | undefined;
  removeAt(index: number): T | undefined;
  append(item: T): void;
  prepend(item: T): void;
  get(index: number): T | undefined;
}

export class DoublyLinkedList<T> implements LinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  insertAt(item: T, index: number): void {
    if (index > this.length) throw new Error("Index out of bounds");
    else if (index === this.length) {
      this.append(item);
      return;
    } else if (index === 0) {
      this.prepend(item);
      return;
    }

    this.length++;
    const curr = this.getAt(index) as Node<T>;
    const node: Node<T> = { value: item };

    // Attach the new node
    node.next = curr;
    node.prev = curr.prev;
    // Break the existing links
    curr.prev = node;

    if (node.prev) {
      node.prev.next = curr;
    }
  }

  remove(item: T): T | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < this.length; i++) {
      if (curr.value === item) {
        break;
      }
      curr = curr.next;
    }

    // no item -> nothing to remove
    if (!curr) return undefined;

    return this.removeNode(curr);
  }

  removeAt(index: number): T | undefined {
    const node = this.getAt(index);

    if (!node) return undefined;

    return this.removeNode(node);
  }

  append(item: T): void {
    this.length++;
    const node: Node<T> = { value: item };

    if (!this.tail) {
      this.head = this.tail = node;
      return undefined;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  prepend(item: T): void {
    const node: Node<T> = { value: item };
    this.length++;

    if (!this.head) {
      // List is empty
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  get(index: number): T | undefined {
    return this.getAt(index)?.value;
  }

  private getAt(index: number): Node<T> | undefined {
    let curr: Node<T> | undefined = this.head;
    for (let i = 0; curr && i < index; i++) {
      curr = curr.next;
    }

    return curr;
  }

  private removeNode(node: Node<T>): T | undefined {
    this.length--;
    if (this.length === 0) {
      const out = this.head?.value;
      this.head = this.tail = undefined;
      return out;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node === this.head) {
      this.head = node.next;
    }

    if (node === this.tail) {
      this.tail = node.prev;
    }

    // not needed in JS
    node.prev = node.next = undefined;

    return node.value;
  }
}
