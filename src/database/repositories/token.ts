import { Token } from '../entities/token';

/**
 * Updates the token for the given service.
 *
 * @param {string} service - Name of the service.
 * @param {string} token - Token value to be saved.
 * @param {number} expiration - When the token expires.
 * @returns {Token} - The token object.
 */
export async function updateTokenForService(service: string, token: string, expiration: number): Promise<Token> {
  let tokenObj = await getTokenForService(service);

  tokenObj.token = token;
  tokenObj.expiration = expiration;

  // Don't need to await, just return the token.
  tokenObj.save()

  return tokenObj;
}

/**
 * Gets the token by the service name.
 *
 * @param service - The name of the service.
 * @returns {Token} - The token object.
 */
export async function getTokenForService(service: string): Promise<Token> {
  return await Token.findOneBy({ service });
}
