import { getToken } from "@api/twitch";
import { Token } from "@entities/token";
import { getTokenForService, updateTokenForService } from "@repositories/token";
import { convertMinutesToMs } from "@utility";
import { Timestamp } from "typeorm";

/**
 * Asynchronous function that returns the Token record
 * so that the token can be used for authorized
 * requests.
 */
export async function twitchToken(): Promise<Token> {
  let token = await getTokenForService("TWITCH");

  const now = new Date().getTime();

  let timestamp = Timestamp.fromNumber(now);
  let fiveMinutesAgo = timestamp.subtract(
    Timestamp.fromNumber(convertMinutesToMs(5))
  );

  if (fiveMinutesAgo.greaterThan(token.expiration)) {
    token = await getNewToken(now);
  }

  return token;
}

/**
 * Gets a new token and stores it in the database.
 *
 * @param {Date} now - The current time.
 */
async function getNewToken(now: number): Promise<Token> {
  let response = await getToken();

  const expiration = Timestamp.fromNumber(now + response.expires_in);

  return await updateTokenForService(
    "TWITCH",
    response.access_token,
    expiration
  );
}
