import { getConnection } from "../index";
import { Token } from "@entities/token";
import { getRepository } from "typeorm";

export async function getTokenForService(service: string): Promise<Token> {
  return await findBy("service = :service", { service });
}

/**
 * Private function to module, that handles the where clause and data
 * substitution.
 *
 * @param {string} clause - The where clause for the query.
 * @param {Record} data - The data to be substituted in the where clause.
 * @returns {Promise} - The record of the viewer.
 */
async function findBy(
  clause: string,
  data: Record<string, any>
): Promise<Token> {
  return getConnection()
    .getRepository(Token)
    .createQueryBuilder()
    .where(clause, data)
    .getOne();
}
