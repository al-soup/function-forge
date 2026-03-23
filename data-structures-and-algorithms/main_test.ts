import { assertEquals } from "@std/assert";
import { expect } from "@std/expect";
import { ArrayList } from "./array-list.ts";
import { binarySearch, linearSearch, twoCrystalBalls } from "./search.ts";
import { bubbleSort } from "./sort.ts";
import { RingBuffer } from "./ring-buffer.ts";

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

Deno.test(function arrayListTest() {
  const list = new ArrayList<number>(3);

  list.append(5);
  list.append(7);
  list.append(9);

  expect(list.get(2)).toEqual(9);
  expect(list.removeAt(1)).toEqual(7);
  expect(list.length).toEqual(2);

  list.append(11);
  expect(list.removeAt(1)).toEqual(9);
  expect(list.remove(9)).toEqual(undefined);
  expect(list.removeAt(0)).toEqual(5);
  expect(list.removeAt(0)).toEqual(11);
  expect(list.length).toEqual(0);

  list.prepend(5);
  list.prepend(7);
  list.prepend(9);

  expect(list.get(2)).toEqual(5);
  expect(list.get(0)).toEqual(9);
  expect(list.remove(9)).toEqual(9);
  expect(list.length).toEqual(2);
  expect(list.get(0)).toEqual(7);
});

Deno.test(function arrayListCapacityTest() {
  const list = new ArrayList<number>(2);

  // Fill to capacity
  list.append(1);
  list.append(2);

  // This should trigger a resize
  list.append(3);
  expect(list.length).toEqual(3);
  expect(list.get(0)).toEqual(1);
  expect(list.get(1)).toEqual(2);
  expect(list.get(2)).toEqual(3);

  // Verify it still works after resize
  list.append(4);
  list.append(5);
  expect(list.length).toEqual(5);
  expect(list.get(4)).toEqual(5);

  // Make sure remove still works after resize
  expect(list.removeAt(2)).toEqual(3);
  expect(list.length).toEqual(4);
  expect(list.get(2)).toEqual(4);

  // Test prepend triggering resize
  const list2 = new ArrayList<number>(2);
  list2.prepend(1);
  list2.prepend(2);
  list2.prepend(3); // should trigger resize
  expect(list2.length).toEqual(3);
  expect(list2.get(0)).toEqual(3);
  expect(list2.get(1)).toEqual(2);
  expect(list2.get(2)).toEqual(1);
});

Deno.test(function ringBufferTest() {
  const buffer = new RingBuffer<number>();

  buffer.push(5);
  expect(buffer.pop()).toEqual(5);
  expect(buffer.pop()).toEqual(undefined);

  buffer.push(42);
  buffer.push(9);
  expect(buffer.pop()).toEqual(42);
  expect(buffer.pop()).toEqual(9);
  expect(buffer.pop()).toEqual(undefined);

  buffer.push(42);
  buffer.push(9);
  buffer.push(12);
  expect(buffer.get(2)).toEqual(12);
  expect(buffer.get(1)).toEqual(9);
  expect(buffer.get(0)).toEqual(42);
});
