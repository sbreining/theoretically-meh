import { internet, random } from 'faker';
import { getRandomInteger } from '@utility';
import points from '@commands/points';
import { findByName, create } from '@repositories/viewer';

jest.mock('../../src/database/repositories/viewer');
const mockGetViewerByName = findByName as jest.Mock;
const mockCreate = create as jest.Mock;

describe('points', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should give a message explaining it could not find the points', async () => {
    const msg = await points.exec();

    expect(msg).toBe('Could not figure out who to find points for.');
  });

  describe('finds viewer', () => {
    let display_name: string;
    let points_: number;

    beforeEach(() => {
      display_name = internet.userName();
    });

    it('should tell the display name how many points they have', async () => {
      points_ = getRandomInteger(2, 999);
      mockGetViewerByName.mockResolvedValue({ points: points_ });

      const msg = await points.exec(display_name);

      expect(mockGetViewerByName).toBeCalledWith(display_name);
      expect(mockCreate).toBeCalledTimes(0);
      expect(msg).toBe(`${display_name} has ${points_} points!`);
    });

    it('should tell the display name they have one point', async () => {
      mockGetViewerByName.mockResolvedValue({ points: 1 });

      const msg = await points.exec(display_name);

      expect(msg).toBe(`${display_name} has 1 point!`);
    });
  });

  describe('creates viewer', () => {
    let name: string;
    let points_: number;
    let id: number;

    beforeEach(() => {
      name = internet.userName();
      points_ = 1;
      id = random.number();

      mockGetViewerByName.mockResolvedValue(null);
      mockCreate.mockResolvedValue({ points: points_ });
    });

    it('should call create() when the viewer is not found', async () => {
      const msg = await points.exec(name);

      expect(mockGetViewerByName).toBeCalledWith(name);
      expect(mockCreate).toHaveBeenCalledWith(name);
      expect(msg).toBe(`${name} has ${points_} point!`);
    });
  });
});
