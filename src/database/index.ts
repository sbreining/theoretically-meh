import { createConnection, getConnectionOptions } from "typeorm";
import entities from "./entities";

/**
 * Initiates the database connection.
 */
export default async function connectToDb(): Promise<void> {
  let options = await getConnectionOptions();
  await createConnection({ ...options, entities });
}
