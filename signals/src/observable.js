// @ts-check

/**
 * @typedef {Object} Observable
 * @property {number} value
 * @property {function(number): void} update
 * @property {function(Function): function(): void} subscribe
 * @property {function(number): void} notify
 */

/**
 * Creates an observable object.
 * @param {number} [initialValue=0]
 * @returns {Observable}
 */
export function observable(initialValue = 0) {
  /**
   * @type {Set<Function>}
   */
  const subscribers = new Set();

  return {
    value: initialValue,
    /**
     * Updates the observable with a new value.
     * @param {number} value
     */
    update(value) {
      this.value = value;
      this.notify(value);
    },
    /**
     * Subscribes a function to the observable.
     * @param {Function} fn
     * @returns {function(): void} Cleanup function to unsubscribe.
     */
    subscribe(fn) {
      subscribers.add(fn);
      // return a cleanup function
      return () => {
        subscribers.delete(fn);
      };
    },
    /**
     * Notifies all subscribers with the new value.
     * @param {number} value
     */
    notify(value) {
      for (const subscriber of subscribers) {
        subscriber(value);
      }
    },
  };
}
