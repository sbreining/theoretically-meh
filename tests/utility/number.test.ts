import { faker } from '@faker-js/faker';
import Utility from '../../src/utility';

describe('getRandomInteger', () => {
  const min = faker.datatype.number();
  const max = faker.datatype.number() + min;

  it('should return an integer between two given values', () => {
    const actual = Utility.Number.getRandomInteger(min, max);

    expect(actual).toBeGreaterThanOrEqual(min);
    expect(actual).toBeLessThanOrEqual(max);
  });
});
