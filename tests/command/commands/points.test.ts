import { faker } from '@faker-js/faker';
import Utility from '../../../src/utility';
import points from '../../../src/command/commands/points';
import { findByName, create } from '../../../src/database/repositories/viewer';

jest.mock('../../../src/database/repositories/viewer');
const mockGetViewerByName = findByName as jest.Mock;
const mockCreate = create as jest.Mock;

describe('points', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('finds viewer', () => {
    let display_name: string;
    let points_: number;

    beforeEach(() => {
      display_name = faker.internet.userName();
    });

    it('should tell the display name how many points they have', async () => {
      points_ = Utility.Number.getRandomInteger(2, 999);
      mockGetViewerByName.mockResolvedValue({ points: points_ });

      const msg = await points.exec({ context: { 'display-name': display_name } });

      expect(mockGetViewerByName).toBeCalledWith(display_name);
      expect(mockCreate).toBeCalledTimes(0);
      expect(msg).toBe(`${display_name} has ${points_} points!`);
    });

    it('should tell the display name they have one point', async () => {
      mockGetViewerByName.mockResolvedValue({ points: 1 });

      const msg = await points.exec({ context: { 'display-name': display_name } });

      expect(msg).toBe(`${display_name} has 1 point!`);
    });
  });

  describe('creates viewer', () => {
    let name: string;
    let points_: number;
    let id: number;

    beforeEach(() => {
      name = faker.internet.userName();
      points_ = 1;
      id = faker.datatype.number();

      mockGetViewerByName.mockResolvedValue(null);
      mockCreate.mockResolvedValue({ points: points_ });
    });

    it('should call create() when the viewer is not found', async () => {
      const msg = await points.exec({ context: { 'display-name': name } });

      expect(mockGetViewerByName).toBeCalledWith(name);
      expect(mockCreate).toHaveBeenCalledWith(name);
      expect(msg).toBe(`${name} has ${points_} point!`);
    });
  });
});
