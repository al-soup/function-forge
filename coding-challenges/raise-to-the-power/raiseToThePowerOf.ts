/**
 * Create a powerTo(a, b) function which will raise the base a to the power of b.
 *
 * St
 */
export const powerTo = (base: number, raise: number): number => {
  let result: number = 1;
  for (let i = 0; i < raise; i++) {
    result *= base;
  }
  return result;
};
