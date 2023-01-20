import { config } from 'dotenv';

config();

export default {
  isProduction: isProduction(),
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
  database_config: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: envToNum(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
    synchronize: envToBool(process.env.DB_SYNC),
  }
};

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 *
 * @param env_str
 * @returns
 */
export function envToBool(env_str: string): boolean {
  return env_str === 'true';
}

/**
 *
 * @param env_str
 * @returns
 */
export function envToNum(env_str: string): number {
  return Number(env_str) ?? 0;
}
