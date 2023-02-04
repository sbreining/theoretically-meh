import { create, findByName } from '../../database/repositories/viewer';
import { CommandArgs, UserCommand } from './command';

class Points extends UserCommand {
  public readonly command = 'points';

  /**
   * Will tell `name` how many points they have.
   */
  public async exec(
    { context: { 'display-name': name } }: CommandArgs
  ): Promise<string> {
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
