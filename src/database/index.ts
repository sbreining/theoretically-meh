import { Connection, createConnection, getConnection as getTypeormConnection, getConnectionOptions } from 'typeorm';
import entities from './entities';

/**
 * Initiates the database connection.
 */
export default async function connect(): Promise<void> {
  let options = await getConnectionOptions();
  await createConnection({ ...options, entities });
}

/**
 * A simple wrapper function for `getConnection` in typeorm.
 *
 * @returns {Connection} - The connection to the database.
 */
export function getConnection(): Connection {
  return getTypeormConnection();
}
