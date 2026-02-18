/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
export function linearSearch(arr: number[], needle: number): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === needle) return true;
  }

  return false;
}

/**
 * Time complexity: O(log n)
 * Space complexity: O(1)
 */
export function binarySearch(arr: number[], needle: number): boolean {
  // [a, b] -> both inclusive
  // (a, b) -> both exclusive

  // Half-Open Interval [low, high) -> low is a valid index, high is the point after the last possible element
  let low: number = 0;
  let high: number = arr.length;

  while (low < high) {
    const mid = Math.floor(low + (high - low) / 2);
    const v = arr[mid];

    if (v === needle) {
      return true;
    } else if (needle < v) {
      // exclude mid
      high = mid;
    } else {
      // exclude mid
      low = mid + 1;
    }
  }

  return false;

  // Contrast with a Closed Interval [low, high] -> both low and high are valid indices

  // let low: number = 0;
  // let high: number = arr.length - 1;

  // while (low <= high) {
  //   const mid = Math.floor(low + (high - low) / 2);
  //   const v = arr[mid];

  //   if (v === needle) {
  //     return true;
  //   } else if (needle < v) {
  //     high = mid - 1;
  //   } else {
  //     low = mid + 1;
  //   }
  // }

  // return false;
}

/**
 * Given an array of boolean values, where `true` represents a broken crystal ball and `false` represents an intact crystal ball, determine the index of the first
 * broken crystal ball. You are allowed to drop a crystal ball from any index in the array. If it breaks, you can no longer use that ball. If it doesn't break, you
 * can reuse it. Your goal is to find the index of the first broken crystal ball using the minimum number of drops.
 *
 * For example, if the input array is `[false, false, true, true, true]`, the function should return `2`, since the first broken crystal ball is at index `2`.
 *
 * sqrt(n) is a good step size: you don't want to take too many little steps, but you also don't want to take go back too much and do too many one-by-one steps from to last position.
 * Time complexity: O(sqrt(n))
 * Space complexity: O(1)
 */
export function twoCrystalBalls(breaks: boolean[]): number {
  const stepSize = Math.floor(Math.sqrt(breaks.length));

  let height: number = stepSize;
  // Advance by one step
  for (let i = 0; i < breaks.length; i += stepSize) {
    if (breaks[i]) {
      break;
    }
    height = i;
  }

  // If the ball was broken you advance one-by-one from the last unbroken position
  for (let j = height; j < breaks.length; j++) {
    if (breaks[j]) return j;
  }

  return -1;
}
