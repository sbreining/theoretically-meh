import { config } from "@utility";
import axios from "axios";

/**
 * Makes GET request to tmi.twitch.tv for the viewers that
 * are currently in chat. This endpoint is currently heavily
 * cached, and not great. Hoping to get an endpoint through
 * helix, so this function should be updated then.
 *
 * @returns {Object} - A JSON object of the viewers in chat.
 */
export default async function getViewersList() {
  const {
    twitch: { channel },
  } = config;
  const url = `http://tmi.twitch.tv/group/user/${channel}/chatters`;
  const response = await axios.get(url);

  return response.data;
}

/**
 * https://dev.twitch.tv/docs/api/reference#modify-channel-information
 *
 * PATCH https://api.twitch.tv/helix/channels
 * REQ: broadcaster_id
 * BODY: game_id, broadcaster_language, title
 */
