import { getViewersList } from '@api/twitch';
import { addPointsByName } from '@repositories/viewer';
import { createInterval, distributePointsToViewership, stopInterval } from '@tools/intervals';
import { datatype, internet, random } from 'faker';

jest.mock('../../src/api/twitch');
let mockGetViewersList = getViewersList as jest.Mock;

jest.mock('../../src/database/repositories/viewer');
let mockAddPoints = addPointsByName as jest.Mock;

describe('Interval Tools', () => {
  beforeEach(() => {
    // If more places start to use timer functions outside of this,
    // turn to jest.config.js and use the following block:
    /**
     * module.exports = {
     *   timers: 'legacy',
     * };
     */
    jest.useFakeTimers('legacy');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('createInterval', () => {
    it('should call setInterval with expected callback and time period', async () => {
      const callback = jest.fn();
      const milliseconds = datatype.number();

      await createInterval(random.word(), callback, milliseconds);

      expect(setInterval).toHaveBeenCalledWith(callback, milliseconds);
    });

    it('should throw an error if the name already exists', async () => {
      const callback = jest.fn();
      const milliseconds = datatype.number();

      const name = random.word();

      await createInterval(name, callback, milliseconds);

      const newCallback = jest.fn();
      const newMillis = datatype.number();
      try {
        await createInterval(name, newCallback, newMillis);
      } catch (e) {
        expect(e.message).toBe('That name already exists');
        return;
      }

      fail('Failed to catch any error');
    });
  });

  describe('stopInterval', () => {
    it('should call clearInterval', async () => {
      await stopInterval(random.word());

      expect(clearInterval).toHaveBeenCalled();
    });
  });

  describe('distributePointsToViewership', () => {
    beforeEach(() => {
      const groups = {
        broadcaster: [internet.userName(), internet.userName()],
        vips: [internet.userName(), internet.userName()],
        moderators: [internet.userName(), internet.userName()],
        viewers: [internet.userName(), internet.userName()],
      };

      mockGetViewersList.mockResolvedValue(groups);
    });

    it('should distribute points to viewers of each group', async () => {
      await distributePointsToViewership();

      expect(mockGetViewersList).toHaveBeenCalled();
      expect(mockAddPoints).toHaveBeenCalledTimes(8);
    });
  });
});
