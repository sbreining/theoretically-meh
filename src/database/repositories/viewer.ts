import { getConnection } from '../index';
import { Viewer } from '@entities/viewer';

/**
 * Creates a new record for for the given viewer name.
 *
 * @param {string} name - The name of the viewer.
 * @returns {Promise<number>} - The ID of the newly inserted row.
 */
export async function create(name: string): Promise<number> {
  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Viewer)
    .values({ name: name.toLowerCase(), points: 1 })
    .execute();

  return result.identifiers[0].id;
}

/**
 * Find a Viewer record.
 *
 * @param {number} id - ID of record to find.
 * @returns {Promise<Viewer>} - The viewer record.
 */
export async function find(id: number): Promise<Viewer> {
  return await findBy('id = :id', { id });
}

/**
 * Find a Viewer record by name.
 *
 * @param {string} name - The name of the viewer to search by.
 * @returns {Promise<Viewer} - The viewer record.
 */
export async function findByName(name: string): Promise<Viewer> {
  return await findBy('name = :name', { name: name.toLowerCase() });
}

/**
 * Private function to module, that handles the where clause and data
 * substitution.
 *
 * @param {string} clause - The where clause for the query.
 * @param {Record} data - The data to be substituted in the where clause.
 * @returns {Promise} - The record of the viewer.
 */
async function findBy(clause: string, data: Record<string, any>): Promise<Viewer> {
  return getConnection()
    .getRepository(Viewer)
    .createQueryBuilder()
    .where(clause, data)
    .getOne();
}
