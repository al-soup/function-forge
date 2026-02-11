// Returns a boolean of wether the needle n is in the haystack arr
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

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const arr = [1, 2, 3, 4, 5];
  console.log(
    `The element 3 ${binarySearch(arr, 3) ? "is" : "is not"} in the array ${arr}`,
  );
}
