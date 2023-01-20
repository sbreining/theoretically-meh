import { getViewersList } from '../../src/api/twitch';
import { addPointsByName } from '../../src/database/repositories/viewer';
import { distributePointsToViewership } from '../../src/tools/intervals';
import { internet } from 'faker';

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
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
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
