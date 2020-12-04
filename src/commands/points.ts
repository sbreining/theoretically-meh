import { getConnection } from "typeorm";
import { Viewer } from "../database/entities/viewer";
import { AsyncCommand } from "./command";

class Points implements AsyncCommand {
  public command = "points";

  public instruction = "To come later.";

  public async exec(viewer_name?: string): Promise<string> {
    if (!viewer_name) {
      return "Could not figure out who to find points for.";
    }

    const connection = await getConnection();

    const viewer = await connection
      .getRepository(Viewer)
      .createQueryBuilder("viewers")
      .where("viewers.name = :name", { name: viewer_name.toLowerCase() })
      .getOne();

    if (!viewer) {
      connection
        .createQueryBuilder()
        .insert()
        .into(Viewer)
        .values({ name: viewer_name.toLowerCase(), points: 1 })
        .execute();

      return `${viewer_name} has 1 point!`;
    }

    return `${viewer_name} has ${viewer.points} points!`;
  }
}

export default new Points();
