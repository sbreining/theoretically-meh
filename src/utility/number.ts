/**
 * Returns an integer within the range of `min` to `max`.
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @return {number} - A random integer.
 */
export const getRandomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};
