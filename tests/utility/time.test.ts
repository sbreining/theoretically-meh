import { faker } from '@faker-js/faker';
import Utility from '../../src/utility';

describe('Time Utility', () => {
  describe('converMinutesToMs', () => {
    let minutes = Math.floor(faker.datatype.number());

    it('should convert any given number of minutes into ms', () => {
      const actual = Utility.Time.convertMinutesToMs(minutes);

      expect(actual).toBe(minutes * 60 * 1000);
    });
  });

  describe('addSecondsToDate', () => {
    it('should add the seconds to the date', () => {
      const seconds = Number(faker.random.numeric(3));
      const now = new Date();

      const future = Utility.Time.addSecondsToDate(now, seconds)

      expect(now.getTime()).toBeLessThan(future.getTime());
    });
  });
});
