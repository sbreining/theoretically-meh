import { Connection, getConnection } from "typeorm";
import { Viewer } from "../entities/viewer";

/**
 *
 * @param name
 * @param connection
 */
export const create = async (
  name: string,
  connection: Connection = null
): Promise<number> => {
  connection = connection || getConnection();

  const result = await connection
    .createQueryBuilder()
    .insert()
    .into(Viewer)
    .values({ name: name.toLowerCase(), points: 1 })
    .execute();

  return result.identifiers[0].id;
};

/**
 *
 * @param id
 * @param connection
 */
export const find = async (
  id: number,
  connection: Connection = null
): Promise<Viewer> => {
  connection = connection || getConnection();

  return connection
    .getRepository(Viewer)
    .createQueryBuilder()
    .where("id = :id", { id })
    .getOne();
};

/**
 *
 * @param name
 * @param connection
 */
export const getViewerByName = async (
  name: string,
  connection: Connection = null
): Promise<Viewer> => {
  connection = connection || getConnection();

  return connection
    .getRepository(Viewer)
    .createQueryBuilder()
    .where("name = :name", { name: name.toLowerCase() })
    .getOne();
};
