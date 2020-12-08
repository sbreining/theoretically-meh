import { getConnection } from "../index";
import { Viewer } from "@entities/viewer";

/**
 *
 * @param name
 */
export const create = async (name: string): Promise<number> => {
  const result = await getConnection()
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
export const find = async (id: number): Promise<Viewer> => {
  return getConnection()
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
export const findByName = async (name: string): Promise<Viewer> => {
  return getConnection()
    .getRepository(Viewer)
    .createQueryBuilder()
    .where("name = :name", { name: name.toLowerCase() })
    .getOne();
};
