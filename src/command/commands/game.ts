import TwitchApi from '../../api/twitch';
import { CommandArgs, ModCommand } from './command';

class Game extends ModCommand {
  private readonly GAMES = {
    valorant: '516575',
    science: '509670',
    chatting: '509658',
    software: '1469308723',
    poe: '29307',
    lor: '514790',
  }

  /**
   * Will update the game for the provided name. A much smaller dictionary of
   * games is being used because these are the games I'm willing to stream.
   *
   * @returns {string} - An empty string such that nothing is said to channel.
   */
  public async exec({ command }: CommandArgs): Promise<string> {
    const game = command.split(' ')[1];

    TwitchApi.Channel.updateInfo({ game_id: this.GAMES[game.toLowerCase()] })

    // Always return empty string, because the game category should update
    // on Twitch.
    return '';
  }
}

export default new Game();
