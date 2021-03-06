import { random } from 'faker';
import { getRandomInteger } from '@utility';

describe('getRandomInteger', () => {
  const min = random.number();
  const max = random.number() + min;

  it('should return an integer between two given values', () => {
    const actual = getRandomInteger(min, max);

    expect(actual).toBeGreaterThanOrEqual(min);
    expect(actual).toBeLessThanOrEqual(max);
  });
});
