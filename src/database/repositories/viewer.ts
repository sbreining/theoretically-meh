import { Viewer } from '../entities/viewer';

/**
 * Add the number of points to the specified viewer's profile.
 *
 * @param {string} name - The name of the viewer.
 * @param {number} points - The number of points to add.
 * @returns {Promise} - Nothing is returned.
 */
export async function addPointsByName(name: string, points: number): Promise<void> {
  let viewer = await findByName(name);

  if (!viewer) {
    create(name, points);
    return;
  }

  viewer.points += points;
  viewer.save();
}

/**
 * Creates a new record for for the given viewer name.
 *
 * @param {string} name - The name of the viewer.
 * @returns {Promise<number>} - The ID of the newly inserted row.
 */
export async function create(name: string, points = 1): Promise<Viewer> {
  let viewer = new Viewer();
  viewer.name = name.toLocaleLowerCase();
  viewer.points = points;

  let result = await viewer.save();

  // After insert, just update the id and created_at from the query.
  viewer.id = result.id;
  viewer.created_at = result.created_at;

  return viewer;
}

/**
 * Find a Viewer record.
 *
 * @param {number} id - ID of record to find.
 * @returns {Promise<Viewer>} - The viewer record.
 */
export async function find(id: number): Promise<Viewer> {
  return await Viewer.findOneBy({ id });
}

/**
 * Find a Viewer record by name.
 *
 * @param {string} name - The name of the viewer to search by.
 * @returns {Promise<Viewer} - The viewer record.
 */
export async function findByName(name: string): Promise<Viewer> {
  return await Viewer.findOneBy({ name: name.toLowerCase() });
}
