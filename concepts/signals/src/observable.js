// @ts-check

/**
 * @typedef {Object} Observable
 * @property {function(): void} increment - Increases the value of the observable.
 * @property {function(Function): function(): void} subscribe - Subscribes a function to the observable.
 * @property {function(number): void} notify - Notifies all subscribers with the new value.
 */

/**
 * Creates an observable object.
 * @param {number} value - The initial value of the observable.
 * @returns {Observable} The observable object.
 */
export function observable(value) {
  /**
   * @type {Set<Function>}
   */
  const subscribers = new Set();

  return {
    /**
     * Increases the value of the observable.
     */
    increment() {
      value++;
      this.notify(value);
    },
    /**
     * Subscribes a function to the observable.
     * @param {Function} fn - The function to subscribe.
     * @returns {function(): void} Cleanup function to unsubscribe.
     */
    subscribe(fn) {
      subscribers.add(fn);

      return () => {
        subscribers.delete(fn);
      };
    },
    /**
     * Notifies all subscribers with the new value.
     * @param {number} value - The new value to notify subscribers with.
     */
    notify(value) {
      for (const subscriber of subscribers) {
        subscriber(value);
      }
    },
  };
}
