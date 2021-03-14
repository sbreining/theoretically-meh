import { config } from 'dotenv';

config();

export default {
  twitch: {
    channel: process.env.TWITCH_CHANNEL,
    client: process.env.TWITCH_CLIENT,
    secret: process.env.TWITCH_SECRET,
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_TOKEN,
  },
  links: {
    discord: process.env.DISCORD_LINK,
  },
};
