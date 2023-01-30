import axios from 'axios';
import Utility, { config } from '../../utility';
import { AppAuth, UserAuth } from './types';

const AUTH_URL = 'https://id.twitch.tv/oauth2/token';

/**
 * Reach out for a bearer token to use for authorized requests.
 *
 * @returns {AppAuth} - An object containing the token information.
 */
export async function requestAppAccess(): Promise<AppAuth> {
  const params = {
    client_id: config.twitch.client,
    client_secret: config.twitch.secret,
    grant_type: 'client_credentials',
  };

  const url = `${AUTH_URL}?${Utility.Web.buildUrlParams(params)}`;

  const response = await axios.post(url);

  return response.data;
}

/**
 * Reach out for a bearer token to use for authorized requests.
 *
 * @returns {Promise<UserAuth>} - An object containing the token information
 */
export async function requestUserAccess(): Promise<UserAuth> {
  const params = {
    client_id: config.twitch.client,
    client_secret: config.twitch.secret,
    code: config.twitch.code,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:3000',
  };

  const url = `${AUTH_URL}?${Utility.Web.buildUrlParams(params)}`;

  const response = await axios.post(url);

  return response.data;
}

/**
 * Refresh the access_token for the user.
 *
 * @returns {Promise<UserAuth>} - Access credentials
 */
export async function refreshUserAccess(token: string): Promise<UserAuth> {
  const params = {
    client_id: config.twitch.client,
    client_secret: config.twitch.secret,
    grant_type: 'refresh_token',
    refresh_token: token,
  };

  const url = `${AUTH_URL}?${Utility.Web.buildUrlParams(params)}`;

  const response = await axios.post(url);

  return response.data;
}
