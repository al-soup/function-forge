// ts-check
let subscriber = null;

export function signal(value) {
  let subscribers = new Set();

  return {
    get value() {
      if (subscriber) {
        subscribers.add(subscriber);
      }
      return value;
    },

    set value(updated) {
      value = updated;
      subscribers.forEach((fn) => fn());
    },
  };
}

export function effect(fn) {
  subscriber = fn;
  // run the effect immediately
  fn();
  subscriber = null;
}

export function derived(fn) {
  const derived = signal();
  effect(() => {
    derived.value = fn();
  });
  return derived;
}
