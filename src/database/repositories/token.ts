import { getConnection } from '../index';
import { Token } from '@entities/token';
import { getRepository } from 'typeorm';

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
  getRepository(Token).save(tokenObj);

  return tokenObj;
}

/**
 * Gets the token by the service name.
 *
 * @param service - The name of the service.
 * @returns {Token} - The token object.
 */
export async function getTokenForService(service: string): Promise<Token> {
  return await findBy('service = :service', { service });
}

/**
 * Private function to module, that handles the where clause and data
 * substitution.
 *
 * @param {string} clause - The where clause for the query.
 * @param {Record} data - The data to be substituted in the where clause.
 * @returns {Promise} - The record of the token.
 */
async function findBy(clause: string, data: Record<string, any>): Promise<Token> {
  return getConnection().getRepository(Token).createQueryBuilder().where(clause, data).getOne();
}
