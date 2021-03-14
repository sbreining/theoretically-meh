import { getViewersList, getToken } from '@api/twitch';
import { config } from '@utility';
import axios from 'axios';

jest.mock('axios');

describe('Twitch API', () => {
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
      await getViewersList();

      expect(getMock).toHaveBeenCalledWith(`http://tmi.twitch.tv/group/user/${twitch.channel}/chatters`);
    });

    it('should return the chatters from the api response', async () => {
      const actualReturn = await getViewersList();

      expect(actualReturn).toBe(expectedReturn);
    });
  });

  describe('getToken', () => {
    const postMock = axios.post as jest.Mock;
    const expectedReturn = { foo: 'bar' };

    beforeEach(() => {
      postMock.mockReturnValue({ data: expectedReturn });
    });

    it('should POST to the correct URL', async () => {
      await getToken();

      expect(postMock).toHaveBeenCalledWith(
        `https://id.twitch.tv/oauth2/token?client_id=${twitch.client}&client_secret=${twitch.secret}&grant_type=client_credentials`
      );
    });

    it("should return the body of the response contained in the 'data' key", async () => {
      const actualReturn = await getToken();

      expect(actualReturn).toBe(expectedReturn);
    });
  });
});
