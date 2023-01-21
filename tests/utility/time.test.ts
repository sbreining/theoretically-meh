import { faker } from '@faker-js/faker';
import { convertMinutesToMs } from '../../src/utility';

describe('convertMinutesToMs', () => {
  let minutes = Math.floor(faker.datatype.number());

  it('should convert any given number of minutes into ms', () => {
    const actual = convertMinutesToMs(minutes);

    expect(actual).toBe(minutes * 60 * 1000);
  });
});
