import { getToken } from '@api/twitch';
import { Token } from '@entities/token';
import { getTokenForService, updateTokenForService } from '@repositories/token';
import { convertMinutesToMs } from '@utility';

/**
 * Asynchronous function that returns the Token record
 * so that the token can be used for authorized
 * requests.
 */
export async function twitchToken(): Promise<Token> {
  let token = await getTokenForService('TWITCH');

  const now = new Date().getTime();

  let fiveMinutesFromNow = now + convertMinutesToMs(5);

  if (fiveMinutesFromNow > token.expiration) {
    token = await getNewToken(now);
  }

  return token;
}

/**
 * Gets a new token and stores it in the database.
 *
 * @param {Date} now - The current time.
 */
async function getNewToken(now: number): Promise<Token> {
  let response = await getToken();

  const expiration = now + response.expires_in;

  return await updateTokenForService('TWITCH', response.access_token, expiration);
}
