import { ArrayList } from "./array-list.ts";

/**
 * Hash Map (a.k.a. Hash Table / Dictionary)
 *
 * A key/value store with average O(1) `set`, `get`, `has` and `delete`.
 *
 * Storage: an array of "buckets", where each bucket holds the entries whose
 * keys hash to that index. Here the bucket array is an `ArrayList` and each
 * bucket itself is a plain JS array of `{ key, value }` entries.
 *
 * Collision resolution: **separate chaining**. When two distinct keys hash to
 * the same bucket index, we simply append the new entry to that bucket's list
 * and do a linear scan when reading. The alternative — open addressing /
 * linear probing — stores every entry directly in the backing array and
 * probes forward on collision. Chaining is more forgiving when the load
 * factor creeps up and is easier to reason about, so it fits a learning
 * implementation better.
 *
 * Hash function: **djb2**. A classic, tiny string hash by Daniel J. Bernstein:
 * `h = h * 33 + c` starting from the magic seed 5381. It's not cryptographic,
 * but it spreads typical string/number keys across buckets well enough.
 *
 * Load factor: `size / capacity`. Once it exceeds `LOAD_FACTOR` (0.75, the
 * textbook default also used by Java's HashMap) we double the capacity and
 * rehash every entry into the new bucket array. Without this, buckets grow
 * unbounded and lookups degrade toward O(n).
 *
 * Keys are constrained to `string | number` so we can hash them by their
 * string representation. Supporting arbitrary object keys would require
 * tracking identity separately, which distracts from the core idea.
 */

type Entry<K, V> = { key: K; value: V };

export class HashMap<K extends string | number, V> {
  public size: number;
  public capacity: number;
  private buckets: ArrayList<Entry<K, V>[]>;
  private static readonly LOAD_FACTOR = 0.75;

  constructor(capacity: number = 16) {
    this.capacity = capacity;
    this.size = 0;
    this.buckets = new ArrayList<Entry<K, V>[]>(capacity);
    for (let i = 0; i < capacity; i++) {
      this.buckets.append([]);
    }
  }

  set(key: K, value: V): void {
    // Check load factor *before* inserting so we never cross the threshold.
    if ((this.size + 1) / this.capacity > HashMap.LOAD_FACTOR) {
      this.resize();
    }

    const idx = this.hash(key) % this.capacity;
    const bucket = this.buckets.get(idx) as Entry<K, V>[];

    for (const entry of bucket) {
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.size++;
  }

  get(key: K): V | undefined {
    const idx = this.hash(key) % this.capacity;
    const bucket = this.buckets.get(idx) as Entry<K, V>[];

    for (const entry of bucket) {
      if (entry.key === key) return entry.value;
    }

    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): V | undefined {
    const idx = this.hash(key) % this.capacity;
    const bucket = this.buckets.get(idx) as Entry<K, V>[];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        const [removed] = bucket.splice(i, 1);
        this.size--;
        return removed.value;
      }
    }

    return undefined;
  }

  // djb2: hash = hash * 33 + char, seeded at 5381. Math.abs guards against
  // negative values from 32-bit integer overflow before we modulo by capacity.
  private hash(key: K): number {
    const s = String(key);
    let h = 5381;
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) + h + s.charCodeAt(i);
    }
    return Math.abs(h);
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    const oldCapacity = this.capacity;

    this.capacity = oldCapacity * 2;
    this.buckets = new ArrayList<Entry<K, V>[]>(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.buckets.append([]);
    }
    this.size = 0;

    for (let i = 0; i < oldCapacity; i++) {
      const bucket = oldBuckets.get(i) as Entry<K, V>[];
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }
}
