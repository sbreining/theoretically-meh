import { faker } from '@faker-js/faker';
import Utility from '../../src/utility';

describe('convertMinutesToMs', () => {
  let minutes = Math.floor(faker.datatype.number());

  it('should convert any given number of minutes into ms', () => {
    const actual = Utility.Time.convertMinutesToMs(minutes);

    expect(actual).toBe(minutes * 60 * 1000);
  });
});
