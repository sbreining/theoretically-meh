import axios from 'axios';
import { API_URL, getHeaders } from './index';
import { buildUrlParams } from '../../utility/web';
import { StreamInfo } from './types';

/**
 * Collect stream information for the provided `channel`
 *
 * @param {string} channel - The channel name on twitch
 * @returns {Promise<StreamInfo>} - The stream info for the channel this bot is
 *                                  being used for.
 */
export async function getStreamInfo(channel: string): Promise<StreamInfo> {
  const response = await axios.get(
    `${API_URL}/streams?${buildUrlParams({ user_login: channel })}`,
    { headers: await getHeaders() }
  );

  return response.data.data[0];
}
