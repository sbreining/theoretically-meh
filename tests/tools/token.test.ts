import { getToken } from '../../src/api/twitch';
import { getTokenForService, updateTokenForService } from '../../src/database/repositories/token';
import { twitchToken } from '../../src/tools/token';
import { convertMinutesToMs } from '../../src/utility';
import { date, datatype } from 'faker';

jest.mock('../../src/api/twitch');
const mockGet = getToken as jest.Mock;

jest.mock('../../src/database/repositories/token');
const mockGetToken = getTokenForService as jest.Mock;
const mockUpdateToken = updateTokenForService as jest.Mock;

describe('Token', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('twitchToken', () => {
    let newToken;
    let token;

    beforeEach(() => {
      token = {
        id: datatype.number(),
        service: 'TWITCH',
        token: datatype.uuid(),
        expiration: new Date().getTime() + convertMinutesToMs(20),
        created_at: date.past(),
      };

      mockGetToken.mockResolvedValue(token);

      newToken = datatype.uuid();
      let twitchResponse = { access_token: newToken, expires_in: convertMinutesToMs(36000) };

      mockGet.mockResolvedValue(twitchResponse);

      let updatedToken = {
        id: token.id,
        service: token.service,
        token: newToken,
        expiration: new Date().getTime() + twitchResponse.expires_in,
        created_at: token.created_at,
      };

      mockUpdateToken.mockResolvedValue(updatedToken);
    });

    it('should return a token from the database with more than 5 minutes until expiration', async () => {
      const actual = await twitchToken();

      expect(actual).toStrictEqual(token);
      expect(mockUpdateToken).not.toHaveBeenCalled();
    });

    it('should call the api helper to acquire a new token if the expiration is less than 5 minutes away', async () => {
      token.expiration = new Date().getTime() + convertMinutesToMs(1);

      await twitchToken();

      expect(mockGet).toHaveBeenCalled();
      expect(mockUpdateToken).toHaveBeenCalled();
    });

    it('should refresh an expired token', async () => {
      token.expiration = new Date().getTime() - convertMinutesToMs(3);

      const actual = await twitchToken();

      expect(actual.token).toBe(newToken);
      expect(actual.expiration).toBeGreaterThan(new Date().getTime());
    });
  });
});
