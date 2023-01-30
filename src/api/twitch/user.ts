import axios from 'axios';
import { config } from '../../utility';
import { ViewerList } from './types';

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
