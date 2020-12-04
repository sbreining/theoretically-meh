import { createConnection, getConnectionOptions } from "typeorm";
import entities from "./entities";

export default async function connectToDb(): Promise<void> {
  let options = await getConnectionOptions();
  await createConnection({ ...options, entities });
}
