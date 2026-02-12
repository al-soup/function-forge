import { binarySearch } from "./search.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const arr = [1, 2, 3, 4, 5];
  console.log(
    `The element 3 ${binarySearch(arr, 3) ? "is" : "is not"} in the array ${arr}`,
  );
}
