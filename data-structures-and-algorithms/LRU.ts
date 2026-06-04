type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
  return { value };
}

export class LRU<K, V> {
  private length: number;
  private head?: Node<V>;
  private tail?: Node<V>;

  // The linked-list is the fundamental storage unit
  private lookup: Map<K, Node<V>>;
  private reverseLookup: Map<Node<V>, K>;

  constructor(private capacity: number) {
    // How many items do we wish to have inside our cache

    this.length = 0;
    this.head = this.tail = undefined;
    this.lookup = new Map<K, Node<V>>();
    this.reverseLookup = new Map<Node<V>, K>();
  }

  update(key: K, value: V): void {
    // does it exist?
    // check the cache for existence
    let node = this.lookup.get(key);
    if (!node) {
      node = createNode(value);
      // insert and check capacity and evict if over
      this.length++;
      this.prepend(node);
      this.trimCache();
      this.lookup.set(key, node);
      this.reverseLookup.set(node, key);
    } else {
      // update to the front of the list and update the value
      this.detach(node);
      this.prepend(node);
      node.value = value;
    }
  }

  get(key: K): V | undefined {
    // check the cache for existence
    const node = this.lookup.get(key);
    if (!node) {
      return undefined;
    }

    // update the value we found and move it to the front
    this.detach(node);
    this.prepend(node);

    return node.value;
  }

  private detach(node: Node<V>): void {
    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (this.head === node) {
      this.head = this.head.next;
    }

    if (this.tail === node) {
      this.tail = this.tail.prev;
    }

    node.next = undefined;
    node.prev = undefined;
  }

  private prepend(node: Node<V>): void {
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;

    this.head = node;
  }

  // ensures that cache does not exceed capacity
  private trimCache(): void {
    if (this.length <= this.capacity) {
      return;
    }

    const tail = this.tail!;
    this.detach(this.tail!);

    // We can assume that there should always be a key for a node
    const key = this.reverseLookup.get(tail)!;
    this.lookup.delete(key);
    this.reverseLookup.delete(tail);
    this.length--;
  }
}
