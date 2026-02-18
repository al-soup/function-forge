/**
 * Time complexity: O(n^2)
 * Space complexity: O(1)
 *
 * Explanation for time complexity: (n + 1) * (n / 2) which is the running sum of all values => drop constant: n^2 + n => drop +n
 */
export function bubbleSort(arr: number[]): void {
  let idx = arr.length;
  while (idx > 0) {
    for (let i = 0; i < idx - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
      }
    }
    idx--;
  }

  /*
  // OR

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; ++j) {

      // ...

    }
  }
  */
}
