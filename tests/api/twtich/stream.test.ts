import axios from 'axios';
import { faker } from '@faker-js/faker';
import Twitch from '../../../src/api/twitch';
import { getTwitchAppToken } from '../../../src/database/repositories/token';
import { config } from '../../../src/utility';

jest.mock('axios');
const getMock = axios.get as jest.Mock;

jest.mock('../../../src/database/repositories/token');
const mockGetTwitchAppToken = getTwitchAppToken as jest.Mock;

describe('Twitch Stream API', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const { twitch } = config

  describe('getStreamInfo', () => {
    let channel: string;
    let token: string;
    const expected = { foo: faker.word.noun() };

    beforeEach(() => {
      channel = faker.internet.userName();
      token = faker.datatype.uuid();
      getMock.mockReturnValue({ data: { data: [expected] } });
      mockGetTwitchAppToken.mockReturnValue(token);
    });

    it('should GET at the correct url', async () => {
      await Twitch.Stream.getStreamInfo(channel);

      expect(getMock).toHaveBeenCalledWith(
        `https://api.twitch.tv/helix/streams?user_login=${channel}`,
        { headers: { Authorization: `Bearer ${token}`, 'Client-Id': twitch.client} }
      );
    });
  });
});