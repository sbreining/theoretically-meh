import axios from 'axios';
import { faker } from '@faker-js/faker';
import Twitch from '../../../src/api/twitch';
import { config } from '../../../src/utility';

jest.mock('axios');
const postMock = axios.post as jest.Mock;

describe('Twitch Auth API', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const { twitch } = config;

  describe('requestAppAccess', () => {
    const expectedReturn = { foo: 'bar' };

    beforeEach(() => {
      postMock.mockReturnValue({ data: expectedReturn });
    });

    it('should POST to the correct URL', async () => {
      await Twitch.Auth.requestAppAccess();

      expect(postMock).toHaveBeenCalledWith(
        `https://id.twitch.tv/oauth2/token?client_id=${twitch.client}&client_secret=${twitch.secret}&grant_type=client_credentials`
      );
    });

    it("should return the body of the response contained in the 'data' key", async () => {
      const actualReturn = await Twitch.Auth.requestAppAccess();

      expect(actualReturn).toBe(expectedReturn);
    });
  });

  describe('requestUserAccess', () => {
    const expected = { foo: faker.word.noun() };

    beforeEach(() => {
      postMock.mockReturnValue({ data: expected });
    });

    it('should POST to the correct URL', async () => {
      await Twitch.Auth.requestUserAccess();

      expect(postMock).toHaveBeenCalledWith(
        `https://id.twitch.tv/oauth2/token?client_id=${twitch.client}&client_secret=${twitch.secret}&code=${twitch.code}&grant_type=authorization_code&redirect_uri=http://localhost:3000`
      );
    });

    it('should return the body of the response', async () => {
      const actual = await Twitch.Auth.requestUserAccess();

      expect(actual).toBe(expected);
    });
  });

  describe('refreshUserAccess', () => {
    let token: string;

    const expected = { foo: faker.word.noun() };

    beforeEach(() => {
      token = faker.datatype.uuid();
      postMock.mockReturnValue({ data: expected });
    });

    it('should POST to the correct URL', async () => {
      await Twitch.Auth.refreshUserAccess(token);

      expect(postMock).toHaveBeenCalledWith(
        `https://id.twitch.tv/oauth2/token?client_id=${twitch.client}&client_secret=${twitch.secret}&grant_type=refresh_token&refresh_token=${token}`
      );
    });

    it('should return the body of the response', async () => {
      const actual = await Twitch.Auth.refreshUserAccess(token);

      expect(actual).toBe(expected);
    });
  });
});
