import TwitchApi from "../../api/twitch";
import { CommandArgs, UserCommand } from "./command";

class Title extends UserCommand {
  public readonly command = 'title';

  public readonly instruction =
    'Any user can use "!title". Mods of the channel may use the command then' +
    ' type the new title afterwards to update the stream title.';

  /**
   * The command to handle `!title`. Can either report the current title of the
   * stream for anyone, or a moderator/the streamer can update the title from
   * this command.
   *
   * @param {ChatUserstate} context - The userstate of the user who did command.
   * @param {string} command - The command, which may include the updated title.
   * @returns {string} - The current title, or a message saying the title was
   *                     updated.
   */
  public async exec(args: CommandArgs): Promise<string> {
    const { command, context: { mod: isMod } } = args;

    // If there is more to the title, update if user is mod, otherwise, early
    // exit. Plain users should just use "!title"
    if (command != 'title') {
      return isMod ? await this.updateTitle(args) : '';
    }

    const { title } = await TwitchApi.Channel.getInfo();

    return title;
  }

  private async updateTitle(args: CommandArgs): Promise<string> {
    const { command, context: { mod: isMod } } = args;

    const title = command.replace('title ', '');

   return await TwitchApi.Channel.updateInfo({ title }) ?
      'Title updated successfully' :
      'Attempted to udpate, but something went wrong';
  }
}

export default new Title();
