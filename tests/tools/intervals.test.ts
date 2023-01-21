import { faker } from '@faker-js/faker';
import { getViewersList } from '../../src/api/twitch';
import { addPointsByName } from '../../src/database/repositories/viewer';
import { distributePointsToViewership } from '../../src/tools/intervals';

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
        broadcaster: [faker.internet.userName(), faker.internet.userName()],
        vips: [faker.internet.userName(), faker.internet.userName()],
        moderators: [faker.internet.userName(), faker.internet.userName()],
        viewers: [faker.internet.userName(), faker.internet.userName()],
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
