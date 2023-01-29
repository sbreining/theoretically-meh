import {
  AccessResponse,
  ChannelInfo,
  Token,
  ViewerList
} from './types';
import { config } from '../../utility';
import axios, { AxiosHeaders } from 'axios';
import { getTwitchAppToken, getUserToken } from '../../database/repositories/token';

enum HTTP_CODE {
  NO_CONTENT = 204,
};

const AUTH_URL = 'https://id.twitch.tv/oauth2/token';
const API_URL = 'https://api.twitch.tv/helix';

/**
 * Makes GET request to tmi.twitch.tv for the viewers that are currently in
 * chat. This endpoint is currently heavily cached, and not great. Hoping to get
 * an endpoint through helix, so this function should be updated then.
 *
 * @returns {Object} - A JSON object of the viewers in chat.
 */
export async function getViewersList(): Promise<ViewerList> {
  const { twitch: { channel } } = config;
  const url = `http://tmi.twitch.tv/group/user/${channel}/chatters`;

  try {
    const response = await axios.get(url);
    return response.data['chatters'];
  } catch {
    return {} as ViewerList;
  }
}

/**
 * Reach out for a bearer token to use for authorized requests.
 *
 * @returns {Token} - An object containing the token information.
 */
export async function requestTwitchAppAccess(): Promise<Token> {
  const params = {
    client_id: config.twitch.client,
    client_secret: config.twitch.secret,
    grant_type: 'client_credentials',
  };

  const response = await axios.post(`${AUTH_URL}?${buildUrlParams(params)}`);

  return response.data;
}

/**
 * Reach out for a bearer token to use for authorized requests.
 *
 * @returns {Token} - An object containing the token information.
 */
export async function requestTwitchUserAccess(): Promise<AccessResponse> {
  const params = {
    client_id: config.twitch.client,
    client_secret: config.twitch.secret,
    code: config.twitch.code,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:3000',
  };

  const response = await axios.post(`${AUTH_URL}?${buildUrlParams(params)}`);

  return response.data;
}

/**
 * Refresh the access_token for the user.
 *
 * @returns {Promise<AccessResponse>} - Access credentials
 */
export async function refreshTwitchUserAccess(token: string): Promise<AccessResponse> {
  const params = {
    client_id: config.twitch.client,
    client_secret: config.twitch.secret,
    grant_type: 'refresh_token',
    refresh_token: token,
  };

  const response = await axios.post(`${AUTH_URL}?${buildUrlParams(params)}`);

  return response.data;
}

/**
 * Modify Channel Information
 * https://dev.twitch.tv/docs/api/reference#modify-channel-information
 *
 * PATCH https://api.twitch.tv/helix/channels
 * REQ: broadcaster_id
 * BODY: game_id, title
 *
 * TODO: Create commands such that mods can update the title or the game.
 */
export async function updateChannelInfo(info: ChannelInfo): Promise<boolean> {
  const url = `${API_URL}/channels?broadcaster_id=${config.twitch.broadcaster}`;

  const headers = await getHeaders('application/json');

  const response = await axios.patch(url, info, { headers });

  return response.status === HTTP_CODE.NO_CONTENT;
}

/**
 * Returns the headers needed to perform authorized actions such as; running
 * ads, changing the stream title, starting a poll, etc.
 *
 * @returns {Promise<any>} - Headers necessary for authorized actions.
 */
async function getHeaders(contentType: string, needsUserToken = true): Promise<any> {
  const token = needsUserToken ? await getUserToken() : await getTwitchAppToken();

  return {
    Authorization: `Bearer ${token}`,
    'Client-Id': config.twitch.client,
    'Content-Type': contentType,
  }
}

/**
 * Builds the URL paramters.
 *
 * @param {Record<string, string>} params - Object with {param_name: param_val}
 * @returns {string} - The url params joined by `&`
 */
function buildUrlParams(params: Record<string, string>): string {
  let str = '';
  for (const [key, value] of Object.entries(params)) {
    str += `&${key}=${value}`;
  }

  // Remove the first `&` from the url string.
  return str.slice(1);
}