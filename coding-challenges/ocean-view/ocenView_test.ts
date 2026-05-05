import { assertEquals } from "@std/assert";
import { getBuildingsWithOceanView } from "./oceanView.ts";

// Deno.test(function getBuildingsWithOceanViewTest() {
//   const got1 = getBuildingsWithOceanView([4, 2, 3, 1]);
//   const want1 = [0, 2, 3];
//   assertEquals(got1, want1);

//   const got2 = [4, 3, 2, 1];
//   const want2 = getBuildingsWithOceanView([0, 1, 2, 3]);
//   assertEquals(got2, want2);

//   const got3 = getBuildingsWithOceanView([1, 3, 2, 4]); // FIXME
//   const want3 = [3];
//   assertEquals(got3, want3);
// });
