
import { config } from '@utility';
import axios from 'axios';

// TODO: In no way is this staying like this.

export default async function getViewersList() {
  const { twitch: { channel } } = config;
  const url = `http://tmi.twitch.tv/group/user/${channel}/chatters`;
  axios.get(url).then(res => console.log(res.data));
}