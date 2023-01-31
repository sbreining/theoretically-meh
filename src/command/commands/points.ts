import { ChatUserstate } from 'tmi.js';
import { create, findByName } from '../../database/repositories/viewer';
import Command, { CommandArgs } from './command';

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
   * @param {ChatUserstate} name - The display name of the viewer.
   * @param {string} - The message with name and points.
   */
  public async exec(args: CommandArgs): Promise<string> {
    const { context: { 'display-name': name } } = args;

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
