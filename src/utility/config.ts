export default {
  isProduction: isProduction(),
  twitch: {
    channel: process.env.TWITCH_CHANNEL,
    client: process.env.TWITCH_CLIENT,
    secret: process.env.TWITCH_SECRET,
    code: process.env.TWITCH_CODE,
    broadcaster: process.env.TWITCH_BROADCASTER,
    scopes: process.env.TWITCH_REQUIRED_SCOPES,
    config: {
      channels:[process.env.TWITCH_CHANNEL],
      connection: { secure: true, reconnect: true },
      identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_TOKEN,
      },
    },
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
    logging: envToBool(process.env.DB_LOGG),
  }
};

/**
 * Simply keeping the export object simplified. In the event that a test
 * environment is needed, this will need to change.
 *
 * @returns {boolean} - True if the `NODE_ENV` set to "production"
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Convert an environment variable to a `boolean`. Will take the value of the
 * environment variable, covert it to lower case, then compare against the
 * string of "true". ("True", "TRUE", etc will result in `true`)
 *
 * @param {string} env_str - The value of the environment variable.
 * @returns {boolean} - `true` if env_str is "true", `false` otherwise.
 */
export function envToBool(env_str: string): boolean {
  return env_str.toLowerCase() === 'true';
}

/**
 * Converts environment variable read in to a `number` type. However, it will
 * throw an error if the number cannot be parsed.
 *
 * @param {string} env_str - The value of the environment variable.
 * @returns {number} - The value of the environment variable as a number type.
 */
export function envToNum(env_str: string): number {
  const num = Number(env_str);

  if (!num) throw new Error(`Cannot convert ${env_str} to number.`);

  return num;
}
