import { faker } from '@faker-js/faker';
import { getRandomInteger } from '../../src/utility';

describe('getRandomInteger', () => {
  const min = faker.datatype.number();
  const max = faker.datatype.number() + min;

  it('should return an integer between two given values', () => {
    const actual = getRandomInteger(min, max);

    expect(actual).toBeGreaterThanOrEqual(min);
    expect(actual).toBeLessThanOrEqual(max);
  });
});
