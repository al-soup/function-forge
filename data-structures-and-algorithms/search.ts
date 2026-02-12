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
