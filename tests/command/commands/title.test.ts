import { faker } from '@faker-js/faker';
import TitleCmd from '../../../src/command/commands/title';
import { getInfo, updateInfo } from '../../../src/api/twitch/channel';
import { ChatUserstate } from 'tmi.js';

jest.mock('../../../src/api/twitch/channel');
const mockGetInfo = getInfo as jest.Mock;
const mockUpdateInfo = updateInfo as jest.Mock;

describe('Title Command', () => {
  const expected = 'This Is the Channel Title';
  let context: ChatUserstate;

  afterEach(() => jest.clearAllMocks());

  describe('as a user', () => {
    beforeAll(() => {
      context = { mod: false, 'display-name': faker.internet.userName() };
    });

    beforeEach(() => {
      mockGetInfo.mockReturnValue({ title: expected });
    });

    it('should return the current title', async () => {
      const actual = await TitleCmd.exec({ command: 'title', context });

      expect(mockGetInfo).toHaveBeenCalled();
      expect(actual).toBe(expected);
    });

    it('should return an empty string if user passes more than command', async () => {
      const actual = await TitleCmd.exec({ command: 'title and stuff', context });

      expect(mockGetInfo).not.toHaveBeenCalled();
      expect(actual).toBe('');
    });
  });

  describe('as a mod', () => {
    beforeAll(() => {
      context = { mod: true, 'display-name': faker.internet.userName() };
    });

    it('should return the current title', async () => {
      const actual = await TitleCmd.exec({ command: 'title', context });

      expect(mockGetInfo).toHaveBeenCalled();
      expect(actual).toBe(expected);
    });

    it('should allow the mod to update the title', async () => {
      mockUpdateInfo.mockReturnValue(true);

      const newTitle = 'to be updated';
      const actual = await TitleCmd.exec({ command: `title ${newTitle}`, context });

      expect(mockUpdateInfo).toHaveBeenCalledWith({ title: newTitle });
      expect(actual).toBe('Title updated successfully');
    });

    it('should inform the mod that something went wrong', async () => {
      mockUpdateInfo.mockReturnValue(false);

      const actual = await TitleCmd.exec({ command: 'title blah balh', context });

      expect(actual).toBe('Attempted to update, but something went wrong');
    });
  });
});
