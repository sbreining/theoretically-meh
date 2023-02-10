import { faker } from '@faker-js/faker';
import Twitch from '../../src/api/twitch';
import { addPointsByName } from '../../src/database/repositories/viewer';
import { distributePointsToViewership } from '../../src/utility/intervals';

jest.mock('../../src/api/twitch');
let mockGetViewersList = Twitch.User.getViewersList as jest.Mock;
let mockGetStreamInfo = Twitch.Stream.getStreamInfo as jest.Mock;

jest.mock('../../src/database/repositories/viewer');
let mockAddPoints = addPointsByName as jest.Mock;

describe('Interval Tools', () => {
  beforeEach(() => {
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

    describe('when the stream is live', () => {
      beforeEach(() => {
        mockGetStreamInfo.mockResolvedValue({});
      });

      it('should distribute points to viewers of each group', async () => {

        await distributePointsToViewership();

        expect(mockGetViewersList).toHaveBeenCalled();
        expect(mockAddPoints).toHaveBeenCalledTimes(8);
      });
    });

    describe('when the stream is not live', () => {
      beforeEach(() => {
        mockGetStreamInfo.mockResolvedValue(undefined);
      });

      it('should not disribute points', async () => {
        await distributePointsToViewership();

        expect(mockGetViewersList).not.toHaveBeenCalled();
        expect(mockAddPoints).not.toHaveBeenCalled();
      });
    });
  });
});
