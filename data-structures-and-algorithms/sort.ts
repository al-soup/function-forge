/**
 * BubbleSort
 *
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

/**
 * QuickSort
 *
 * Time complexity: Worst Case O(n^2)
 * Time complexity: Average/Best Case O(n log n)
 * Space complexity: O(1)
 *
 * Depending on the input we can have a different time complexity:
 *
 * Worst Case:
 * -----------
 * The array is already sorted or sorted in reverse. Then we get n + (n-1) + (n-2) + ... + 2 + 1 operations:
 * Sort one element after another. With Gauss's trick this formula can be written like this: S = n(n+1)/2.
 *
 * Explanation:
 * The sum S = 1 + 2 + 3 + 4 + 5 can be calculated by reversing the sum adding each column and dividing by two.
 *
 *   1 + 2 + 3 + 4 + 5
 +   5 + 4 + 3 + 2 + 1
 * ---------------------
 *   6 + 6 + 6 + 6 + 6
 *
 * So: 2S = 30
 * Therefore: S = 15
 *
 *     1 + 2 + 3 + ... + (n-1) + n
 * +   n + (n-1) + (n-2) + ... + 2 + 1
 * ------------------------------------
 * (n+1) + (n+1) + (n+1) + ... + (n+1) + (n+1)
 *
 * 2S = n(n+1)
 * S = n(n+1)/2
 *
 * Of this if you drop the constants you get O(n^2)
 *
 * Best Case:
 * ----------
 *
 * We have 2^k sub-problems of size n/2^k. (k is the number of levels).
 * Since the array size is halved at every step, we need to find out how many
 * times we can divide n by 2 before we reach an array of size 1 (a single
 * element, which requires no sorting):
 *
 * Solve for k: n/2^k = 1 -> the tree has log⁡2(n) levels.
 * Combining the work per level with the number of levels we get: n × log₂(n)
 *
 * Example:
 *
 * Average Case (balanced partitions):
 * Level 0: n comparisons
 * Level 1: n comparisons (but on n/2 elements each)
 * Level 2: n comparisons (but on n/4 elements each)
 * ...
 * Levels: log₂(n)
 * Total: n × log₂(n) → O(n log n)
 *
 * Great visual explanation: https://www.youtube.com/watch?v=MZaf_9IZCrc
 */
export function quickSort(arr: number[]): void {
  // [low, high] are both inclusive
  qs(arr, 0, arr.length - 1);
}

function qs(arr: number[], low: number, high: number): void {
  // base case
  if (low >= high) return;

  const pivotIdx = partition(arr, low, high);

  // do this again, but don't include the pivot index
  qs(arr, low, pivotIdx - 1);
  // sort the other side
  qs(arr, pivotIdx + 1, high);
}

// To split the array into subarrays with elements less than or equal to the pivot and greater than the pivot
// returns the pivot index (what did we end up splitting the array into)
function partition(arr: number[], low: number, high: number): number {
  // choose pivot by using the last element of the current subarray
  const pivot = arr[high];
  let idx = low - 1;

  // weak-sort
  for (let i = low; i < high; i++) {
    // Move everything that is less than our pivot to the front
    if (arr[i] <= pivot) {
      idx++;
      const tmp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = tmp;
    }
  }

  // lastly we need to put the pivot into the right position (after everything that is smaller than the pivot)
  idx++;
  arr[high] = arr[idx];
  arr[idx] = pivot;

  return idx;
}

/**
 * MergeSort
 *
 * MergeSort works similarly but divides the array in half repeatedly until each piece
 * has one element, then merges those pieces back together in sorted order.
 * MergeSort guarantees O(n log n) always (and is thus "more stable"), but uses O(n) extra space.
 *
 * NOTE: does not sort in-place but returns a new array
 */
export function mergeSort(arr: number[]): number[] {
  // base case
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);

  // split and recurse
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // merge the sorted halves
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  // compare elements from each half, taking the smaller one
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // append whatever is left over
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}
