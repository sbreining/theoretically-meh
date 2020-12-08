import { create, find, findByName } from "@repositories/viewer";
import Command from "./command";

class Points implements Command {
  public command = "points";

  public instruction =
    "To find out how many points you have, simply type the" +
    " command '!points'. Points are earned by remaining in" +
    " channel, at 1 point per 5 minutes while live, and 1" +
    " point per 15 minutes while offline. There are also" +
    " additional ways, via games in chat.";

  /**
   * Will tell `name` how many points they have.
   *
   * @param {string|null} viewer_name - The display name of the viewer.
   * @param {Promise<string>} - The message with name and points.
   */
  public async exec(viewer_name?: string): Promise<string> {
    if (!viewer_name) {
      return "Could not figure out who to find points for.";
    }

    let viewer = await findByName(viewer_name);
    if (!viewer) {
      const id = await create(viewer_name);
      viewer = await find(id);
    }

    const points = viewer.points;
    const is_plural = 1 === viewer.points;

    return `${viewer_name} has ${points} ${is_plural ? "point" : "points"}!`;
  }
}

export default new Points();
