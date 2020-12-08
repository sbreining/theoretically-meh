import { config } from 'dotenv';

config();

export default {
  twitch: {
    channel: process.env.TWITCH_CHANNEL,
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_TOKEN,
  },
  links: {
    discord: process.env.DISCORD_LINK,
  },
};
