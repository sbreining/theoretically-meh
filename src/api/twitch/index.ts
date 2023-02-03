import { config } from '../../utility';
import {
  getUserToken,
  getTwitchAppToken,
} from '../../database/repositories/token';

import * as Auth from './auth';
import * as Channel from './channel';
import * as Stream from './stream';
import * as User from './user';

export const API_URL = 'https://api.twitch.tv/helix';

/**
 * Returns the headers needed to perform authorized actions such as; running
 * ads, changing the stream title, starting a poll, etc.
 *
 * @returns {Promise<any>} - Headers necessary for authorized actions.
 */
export async function getHeaders(
  contentType?: string,
  needsUserToken = false,
): Promise<any> {
  const token = await (needsUserToken ? getUserToken() : getTwitchAppToken());

  const headers = {
    Authorization: `Bearer ${token}`,
    'Client-Id': config.twitch.client,
  };

  if (!contentType) return headers;

  return { ...headers, 'Content-Type': contentType };
}

export default { Auth, Channel, Stream, User };
