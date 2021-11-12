import { create, findByName } from '@repositories/viewer';
import Command from './command';

class Points implements Command {
  public readonly command = 'points';

  public readonly instruction =
    'To find out how many points you have, simply type the' +
    ' command "!points". Points are earned by remaining in' +
    ' channel every 5 minutes There are also additional' +
    ' ways, via games in chat.';

  /**
   * Will tell `name` how many points they have.
   *
   * @param {string|null} name - The display name of the viewer.
   * @param {string} - The message with name and points.
   */
  public async exec(name?: string): Promise<string> {
    if (!name) {
      return 'Could not figure out who to find points for.';
    }

    let viewer = await findByName(name);
    if (!viewer) {
      viewer = await create(name);
    }

    const points = viewer.points;
    const is_plural = 1 === viewer.points;

    return `${name} has ${points} ${is_plural ? 'point' : 'points'}!`;
  }
}

export default new Points();
