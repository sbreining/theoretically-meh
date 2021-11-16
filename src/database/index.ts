import { Connection, createConnection, getConnection as getTypeormConnection, getConnectionOptions } from 'typeorm';
import entities from './entities';

/**
 * Initiates the database connection.
 */
export default async function connect(): Promise<void> {
  const options = await getConnectionOptions();
  const migrations = ['../../migrations/*.ts']
  const migrationsRun = true;

  await createConnection({ ...options, entities, migrations, migrationsRun });
}

/**
 * A simple wrapper function for `getConnection` in typeorm.
 *
 * @returns {Connection} - The connection to the database.
 */
export function getConnection(): Connection {
  return getTypeormConnection();
}
