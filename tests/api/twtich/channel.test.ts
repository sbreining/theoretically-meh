import axios from 'axios';
import { faker } from '@faker-js/faker';
import Twitch from '../../../src/api/twitch';
import { config } from '../../../src/utility';
import { getTwitchAppToken, getUserToken } from '../../../src/database/repositories/token';
import { UpdateChannelInfo } from '../../../src/api/twitch/types';
import { HTTP_CODE } from '../../../src/utility/web';

jest.mock('axios');
const getMock = axios.get as jest.Mock;
const patchMock = axios.patch as jest.Mock;

jest.mock('../../../src/database/repositories/token');
const mockGetTwitchAppToken = getTwitchAppToken as jest.Mock;
const mockGetUserToken = getUserToken as jest.Mock;

describe('Twitch Channel API', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const { twitch } = config;

  describe('getInfo', () => {
    let token: string;
    const expected = { foo: faker.word.noun() };

    beforeEach(() => {
      token = faker.datatype.uuid();
      getMock.mockReturnValue({ data: { data: [expected] } });
      mockGetTwitchAppToken.mockReturnValue(token);
    });

    it('should GET to the correct URL', async () => {
      await Twitch.Channel.getInfo();

      expect(getMock).toHaveBeenCalledWith(
        `https://api.twitch.tv/helix/channels?broadcaster_id=${twitch.broadcaster}`,
        { headers: { Authorization: `Bearer ${token}`, 'Client-Id': twitch.client } },
      );
    });

    it("should return the body of the response contained in the 'data' key", async () => {
      const actual = await Twitch.Channel.getInfo();

      expect(actual).toBe(expected);
    });
  });

  describe('updateInfo', () => {
    let token: string;
    let info: UpdateChannelInfo;

    beforeEach(() => {
      info = { title: faker.word.adjective() }
      token = faker.datatype.uuid();
      patchMock.mockReturnValue({ status: HTTP_CODE.NO_CONTENT });
      mockGetUserToken.mockReturnValue(token);
    });

    it('should PATCH to the correct URL', async () => {
      await Twitch.Channel.updateInfo(info);

      expect(patchMock).toHaveBeenCalledWith(
        `https://api.twitch.tv/helix/channels?broadcaster_id=${twitch.broadcaster}`,
        info,
        { headers: {
            Authorization: `Bearer ${token}`,
            'Client-Id': twitch.client,
            'Content-Type': 'application/json'
          },
        },
      );
    });

    it('should return true if the response is successful', async () => {
      const actual = await Twitch.Channel.updateInfo(info);

      expect(actual).toBe(true);
    });

    it('should return false if the response is unsuccessful', async () => {
      patchMock.mockReturnValue({ status: 400 });

      const actual = await Twitch.Channel.updateInfo(info);

      expect(actual).toBe(false);
    });
  });
});