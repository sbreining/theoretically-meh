import { config } from "dotenv";

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
  database: {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
};
