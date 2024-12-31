import { observable } from "./observable";
import "./style.css";

/**
 * Signals are based on the observer pattern but they are not the same.
 */

// Setting up a simple counter

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Exploring Signals</h1>
    <h2>Standard Counter</h2>
    <div class="card">
      <button id="counter-standard" type="button">the count is 0</button>
    </div>
    <h2>Counter through Observable</h2>
    <div class="card">
      <button id="counter-observable" type="button">the count is 0</button>
    </div>
    <h2>Counter through Signal</h2>
    <div class="card">
      <button id="counter-signal" type="button">the count is 0</button>
    </div>
  </div>
`;

/** @type {HTMLButtonElement} */
const counterStandardBtn = document.querySelector("#counter-standard");

let countStandard = 0;

counterStandardBtn.addEventListener("click", () => {
  countStandard++;
  counterStandardBtn.innerText = `the count is ${countStandard}`;
});

// In order to access the count variable from another module, we want to refactor this to an observable.

/** @type {HTMLButtonElement} */
const counterObservableBtn = document.querySelector("#counter-observable");
const count$ = observable(0);

// We can now update the observable's value when the button is clicked.
counterObservableBtn.addEventListener("click", () => {
  // the observable handles state internally
  count$.increment();
});

// We can now subscribe to the observable and interact with new values.
count$.subscribe((value) => {
  counterObservableBtn.innerText = `the count is ${value}`;
});

// Setting up a second subscriber
const logger$ = count$.subscribe((value) => {
  console.log(`Observable: the count is ${value}`);
});

// And also unsubscribe if we want to
const unsubscribe = count$.subscribe((value) => {
  console.log(`Observable ${value}/4`);
  if (value === 4) {
    unsubscribe();
  }
});

// By subscribing to the observable we can react events in the data stream but not access it's state. Later subscribers will not be able to access previous values.
count$.increment();
const lateSub = count$.subscribe((value) => {
  console.log(
    `Observable: I can never log the number "1". Currently: ${value}`
  );
});

// Another approach would be to use signals. Signals are similar to observables but they allow access to the current value and use way less boilerplate setup:
import { signal, effect, derived } from "./signal";

const counterSignalBtn = document.querySelector("#counter-signal");

const countSignal = signal(0);

effect(() => {
  console.log(`Signal: the count is ${countSignal.value}`);
  counterSignalBtn.innerText = `the count is ${countSignal.value}`;
});

counterSignalBtn.addEventListener("click", () => {
  countSignal.value++;
});

let double = derived(() => countSignal.value * 2);
effect(() => {
  console.log(`Signal: the double is ${double.value}`);
});
