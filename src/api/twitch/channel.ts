import axios from 'axios';
import Utility, { config } from '../../utility';
import { API_URL, getHeaders } from './index';
import { ChannelInfo, UpdateChannelInfo } from './types';

/**
 * Request to the twitch API for the channel information.
 *
 * @returns {Promise<ChannelInfo>} - Current channel information.
 */
export async function getInfo(): Promise<ChannelInfo> {
  const url = `${API_URL}/channels?broadcaster_id=${config.twitch.broadcaster}`;

  const headers = await getHeaders();

  const response = await axios.get(url, { headers });

  return response.data.data[0];
}

/**
 * Modify Channel Information
 * https://dev.twitch.tv/docs/api/reference#modify-channel-information
 *
 * PATCH https://api.twitch.tv/helix/channels
 * REQ: broadcaster_id
 * BODY: game_id, title
 *
 * @param {UpdateChannelInfo} info - The information to be updated about stream.
 * @return {Promise<boolean>} - If stream updated, returns `true`.
 */
export async function updateInfo(info: UpdateChannelInfo): Promise<boolean> {
  const url = `${API_URL}/channels?broadcaster_id=${config.twitch.broadcaster}`;

  const headers = await getHeaders('application/json', true);

  const response = await axios.patch(url, info, { headers });

  return response.status === Utility.Web.HTTP_CODE.NO_CONTENT;
}
