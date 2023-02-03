import { UserCommand } from './command';

class Welcome extends UserCommand {
  public readonly command = 'welcome';

  public readonly instruction = 'Simply type "!welcome"';

  /**
   * Returns a simple message with the channel information.
   *
   * @return {string} - The message.
   */
  public exec(): string {
    return (
      "Welcome to KettelBear's den. Please, feel free explore" +
      ' available commands (!commands), or check out the discord' +
      ' (!discord). Find more information below the stream,' +
      ' including schedule, computer specs, follower goals, etc.'
    );
  }
}

export default new Welcome();
