import { getConnection } from "../index";
import { Viewer } from "@entities/viewer";
import { getRepository } from "typeorm";

/**
 * Add the number of points to the specified viewer's profile.
 *
 * @param {string} name - The name of the viewer.
 * @param {number} points - The number of points to add.
 * @returns {Promise} - Nothing is returned.
 */
export async function addPointsByName(
  name: string,
  points: number
): Promise<void> {
  let viewer = await findByName(name);

  if (!viewer) {
    viewer = await create(name, points);
    return;
  }

  viewer.points += points;
  await getRepository(Viewer).save(viewer);
}

/**
 * Creates a new record for for the given viewer name.
 *
 * @param {string} name - The name of the viewer.
 * @returns {Promise<number>} - The ID of the newly inserted row.
 */
export async function create(name: string, points = 1): Promise<Viewer> {
  let viewer = new Viewer({ name: name.toLowerCase(), points });

  let result = await getRepository(Viewer).insert(viewer);

  // After insert, just update the id and created_at from the query.
  viewer.id = result.generatedMaps[0].id;
  viewer.created_at = result.generatedMaps[0].created_at;

  return viewer;
}

/**
 * Find a Viewer record.
 *
 * @param {number} id - ID of record to find.
 * @returns {Promise<Viewer>} - The viewer record.
 */
export async function find(id: number): Promise<Viewer> {
  return await findBy("id = :id", { id });
}

/**
 * Find a Viewer record by name.
 *
 * @param {string} name - The name of the viewer to search by.
 * @returns {Promise<Viewer} - The viewer record.
 */
export async function findByName(name: string): Promise<Viewer> {
  return await findBy("name = :name", { name: name.toLowerCase() });
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
): Promise<Viewer> {
  return getConnection()
    .getRepository(Viewer)
    .createQueryBuilder()
    .where(clause, data)
    .getOne();
}
