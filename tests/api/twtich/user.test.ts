import Twitch from '../../../src/api/twitch';
import { config } from '../../../src/utility';
import axios from 'axios';

jest.mock('axios');

describe('Twitch User API', () => {
  const { twitch } = config;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getViewersList', () => {
    const getMock = axios.get as jest.Mock;
    const expectedReturn = {
      bogus: ['name1', 'name2', 'name3'],
      foobar: ['name4', 'name5', 'name6'],
    };

    beforeEach(() => {
      getMock.mockReturnValue({ data: { chatters: expectedReturn } });
    });

    it('should call GET with the correct URL', async () => {
      await Twitch.User.getViewersList();

      expect(getMock).toHaveBeenCalledWith(`http://tmi.twitch.tv/group/user/${twitch.channel}/chatters`);
    });

    it('should return the chatters from the api response', async () => {
      const actualReturn = await Twitch.User.getViewersList();

      expect(actualReturn).toBe(expectedReturn);
    });

    it('should return an empty object when catching an error', async () => {
      getMock.mockRejectedValue({});

      const actual = await Twitch.User.getViewersList();

      expect(actual).toStrictEqual({});
    });
  });
});