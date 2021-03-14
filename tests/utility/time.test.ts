import { random } from 'faker';
import { convertMinutesToMs } from '@utility';

describe('convertMinutesToMs', () => {
  let minutes = Math.floor(random.number());

  it('should convert any given number of minutes into ms', () => {
    const actual = convertMinutesToMs(minutes);

    expect(actual).toBe(minutes * 60 * 1000);
  });
});
