import { config } from '@utility';
import axios from 'axios';

/**
 * Makes GET request to tmi.twitch.tv for the viewers that
 * are currently in chat. This endpoint is currently heavily
 * cached, and not great. Hoping to get an endpoint through
 * helix, so this function should be updated then.
 *
 * @returns {Object} - A JSON object of the viewers in chat.
 */
export async function getViewersList(): Promise<ViewerList> {
  const { twitch } = config;
  const url = `http://tmi.twitch.tv/group/user/${twitch.channel}/chatters`;

  const response = await axios.get(url);

  return response.data['chatters'];
}

/**
 * Reach out for a bearer token to use for authorized requests.
 *
 * @returns {Token} - An object containing the token information.
 */
export async function getToken(): Promise<Token> {
  const { twitch } = config;
  const url = `https://id.twitch.tv/oauth2/token?client_id=${twitch.client}&client_secret=${twitch.secret}&grant_type=client_credentials`;

  const response = await axios.post(url);

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

/**
 * Get Streams
 * https://dev.twitch.tv/docs/api/reference#get-streams
 *
 * GET https://api.twitch.tv/helix/streams
 * REQ: None
 * OPT: user_login
 *
 * This is just to get my broadcaster ID.
 */
