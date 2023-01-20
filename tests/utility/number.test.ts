import { datatype } from 'faker';
import { getRandomInteger } from '../../src/utility';

describe('getRandomInteger', () => {
  const min = datatype.number();
  const max = datatype.number() + min;

  it('should return an integer between two given values', () => {
    const actual = getRandomInteger(min, max);

    expect(actual).toBeGreaterThanOrEqual(min);
    expect(actual).toBeLessThanOrEqual(max);
  });
});
