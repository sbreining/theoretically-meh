import { config } from '../../utility';
import Command from './command';

class Discord implements Command {
  public readonly command = 'discord';

  public readonly instruction =
    'Simply type "!discord" to see discord information';

  /**
   * Returns a simple message with the discord link.
   *
   * @return {string} - The message including the discord link.
   */
  public exec(): string {
    const { links } = config;

    return `All are welcome to join the den. Find your way: ${links.discord}`;
  }
}

export default new Discord();
