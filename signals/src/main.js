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
const count$ = observable();

// We can now update the observable's value when the button is clicked.
counterObservableBtn.addEventListener("click", () => {
  count$.update(count$.value + 1);
});

// We can now subscribe to the observable and interact with new values.
count$.subscribe((value) => {
  counterObservableBtn.innerText = `the count is ${value}`;
});

// Setting up a second subscriber
const logger$ = count$.subscribe((value) => {
  console.log(`the count is ${value}`);
});

// And also unsubscribe if we want to
const unsubscribe = count$.subscribe((value) => {
  console.log(`${value}/4`);
  if (value === 4) {
    unsubscribe();
  }
});
