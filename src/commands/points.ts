import { create, findByName } from "@repositories/viewer";
import Command from "./command";

class Points implements Command {
  public command = "points";

  public instruction =
    "To find out how many points you have, simply type the" +
    ' command "!points". Points are earned by remaining in' +
    " channel every 5 minutes There are also additional" +
    " ways, via games in chat.";

  /**
   * Will tell `name` how many points they have.
   *
   * @param {string|null} viewer_name - The display name of the viewer.
   * @param {string} - The message with name and points.
   */
  public async exec(viewer_name?: string): Promise<string> {
    if (!viewer_name) {
      return "Could not figure out who to find points for.";
    }

    let viewer = await findByName(viewer_name);
    if (!viewer) {
      viewer = await create(viewer_name);
    }

    const points = viewer.points;
    const is_plural = 1 === viewer.points;

    return `${viewer_name} has ${points} ${is_plural ? "point" : "points"}!`;
  }
}

export default new Points();
