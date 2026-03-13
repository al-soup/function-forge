/*
# =============================================================================
# There are n buildings in a line. You are given an integer array heights of size n that represents the heights of the buildings in the line.
# 
# The ocean is to the right of the buildings. A building has an ocean view if the building can see the ocean without obstructions.
# Formally, a building has an ocean view if all the buildings to its right have a smaller height.
# 
# Return a list of indices (0-indexed) of buildings that have an ocean view, sorted in increasing order.
 
Example 1:
 
Input: heights = [4,2,3,1]
Output: [0,2,3]
Explanation: Building 1 (0-indexed) does not have an ocean view because building 2 is taller.
 
---
 
Example 2:
 
Input: heights = [4,3,2,1]
Output: [0,1,2,3]
Explanation: All the buildings have an ocean view.
 
---
 
Example 3:
 
Input: heights = [1,3,2,4]
Output: [3]
Explanation: Only building 3 has an ocean view.
---
 
If time allows, here are some constraints we wan't to check:
 
1 <= heights.length <= 105
1 <= heights[i] <= 109
 
---
 
other test cases
 
[1,1,1,4]
[7,2,5,1,5]
[7,2,5,1,9]
*/

const getBuildingsWithOceanView = (buildingsHeights: number[]) => {
  const buildingsWithOceanView: number[] = [];

  for (const [i, buildingHeight] of buildingsHeights.entries()) {
    let hasView = true;
    // Check every building to the right of the current building
    for (const [j, nextBuildingHeight] of buildingsHeights.entries()) {
      if (!hasView) break;
      if (j > i) {
        if (nextBuildingHeight > buildingHeight) {
          hasView = false;
        }
      }
    }
    if (hasView) buildingsWithOceanView.push(i);
  }

  return buildingsWithOceanView;
};

console.log(getBuildingsWithOceanView([4, 2, 3, 1]));
