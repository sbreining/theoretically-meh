import { getViewerByName, create } from "../database/repositories/viewer";
import Command from "./command";

class Points implements Command {
  public command = "points";

  public instruction = "To come later.";

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

    let viewer = await getViewerByName(viewer_name);
    if (!viewer) {
      viewer = await create(viewer_name);
    }

    return `${viewer_name} has ${viewer.points} points!`;
  }
}

export default new Points();
