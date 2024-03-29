import Twitch from '../../api/twitch';
import Utility, { config } from '../../utility';
import { Token } from '../entities/token';

/**
 * Updates the token for the given service.
 *
 * @param {string} service - Name of the service.
 * @param {string} token - Token value to be saved.
 * @param {Date} expiration - When the token expires.
 * @returns {Token} - The token object.
 */
export async function upsertTokenForService(
  service: string,
  access_token: string,
  expiration: Date,
  refresh_token?: string,
): Promise<Token> {
  let tokenObj = await getTokenForService(service);

  if (!tokenObj) tokenObj = new Token();

  tokenObj.service = service;
  tokenObj.access_token = access_token;
  tokenObj.refresh_token = refresh_token;
  tokenObj.expiration = expiration;

  // Don't need to await, just return the token.
  tokenObj.save();

  return tokenObj;
}

/**
 * Fetches the user token from the database. If it does not exist, a request
 * will go to Twitch for an access token. If it is expired, utilize the refresh
 * token to get a new access token, and the new values to the database.
 *
 * @returns {Promise<string>} - User Access Token
 */
export async function getUserToken(): Promise<string> {
  let token = await getTokenForService(config.twitch.channel);

  // If the row doesn't exist in DB, create it.
  if (!token) {
    const response = await Twitch.Auth.requestUserAccess();

    upsertTokenForService(
      config.twitch.channel,
      response.access_token,
      Utility.Time.addSecondsToDate(new Date(), response.expires_in),
      response.refresh_token,
    );

    // Return access token early.
    return response.access_token;
  }

  const now = new Date();
  if (now.getTime() > token.expiration.getTime()) {
    const response = await Twitch.Auth.refreshUserAccess(token.refresh_token);

    // Don't need to await, it is just saving the new token to DB.
    upsertTokenForService(
      config.twitch.channel,
      response.access_token,
      Utility.Time.addSecondsToDate(now, response.expires_in),
      response.refresh_token,
    );

    return response.access_token;
  }

  return token.access_token;
}

/**
 * Fetches the twitch app token used for generic calls.
 *
 * @returns {Promise<string>} - The Application Twitch access token.
 */
export async function getTwitchAppToken(): Promise<string> {
  let token = await getTokenForService('TWITCH');

  if (!token) {
    const response = await Twitch.Auth.requestAppAccess();

    upsertTokenForService(
      'TWITCH',
      response.access_token,
      Utility.Time.addSecondsToDate(new Date(), response.expires_in)
    );

    return response.access_token;
  }

  const now = new Date();
  if (now.getTime() > token.expiration.getTime()) {
    const response = await Twitch.Auth.requestAppAccess();

    // Don't need to await, it is just saving the new token to DB.
    upsertTokenForService(
      'TWITCH',
      response.access_token,
      Utility.Time.addSecondsToDate(now, response.expires_in),
    );

    return response.access_token;
  }

  return token.access_token;
}

/**
 * Gets the token by the service name.
 *
 * @param service - The name of the service.
 * @returns {Token} - The token object.
 */
async function getTokenForService(service: string): Promise<Token> {
  return await Token.findOneBy({ service });
}
