import { assertEquals } from "@std/assert";
import twoCrystalBalls, { binarySearch, linearSearch } from "./search.ts";
import { bubbleSort } from "./sort.ts";

// 100 elements
const sortedArr = [
  2, 5, 9, 14, 18, 23, 27, 31, 36, 40, 45, 49, 54, 58, 63, 67, 72, 76, 81, 85,
  90, 94, 99, 103, 108, 112, 117, 121, 126, 130, 135, 139, 144, 148, 153, 157,
  162, 166, 171, 175, 180, 184, 189, 193, 198, 202, 207, 211, 216, 220, 225,
  229, 234, 238, 243, 247, 252, 256, 261, 265, 270, 274, 279, 283, 288, 292,
  297, 301, 306, 310, 315, 319, 324, 328, 333, 337, 342, 346, 351, 355, 360,
  364, 369, 373, 378, 382, 387, 391, 396, 400, 405, 409, 414, 418, 423, 427,
  432, 436, 441, 445,
];

Deno.test(function linearSearchTest() {
  assertEquals(linearSearch(sortedArr, sortedArr[10]), true);
});

Deno.test(function binarySearchTest() {
  assertEquals(binarySearch(sortedArr, 387), true);
  assertEquals(binarySearch(sortedArr, 50), false);
  assertEquals(binarySearch(sortedArr, 2), true);
  assertEquals(binarySearch(sortedArr, 198), true);
  assertEquals(binarySearch(sortedArr, 401), false);
});

Deno.test(function twoCrystalBallsTest() {
  assertEquals(twoCrystalBalls([false, false, false, false, true, true]), 4);
  const crystalBallArr = Array.from({ length: 80 }, (_, i) =>
    i >= 69 ? true : false,
  );
  assertEquals(twoCrystalBalls(crystalBallArr), 69);
});

Deno.test(function bubbleSortTest() {
  const arr = [2, 3, 4, 2, 6, 75, 50, 12, 6];
  const sorted = [...arr].sort((a, b) => a - b);
  bubbleSort(arr);
  assertEquals(arr, sorted);
});
