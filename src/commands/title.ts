import { ChatUserstate } from "tmi.js";
import TwitchApi from "../api/twitch";
import Command from "./command";

class Title implements Command {
  public readonly command = 'title';

  public readonly instruction =
    'Any user can use "!title". Mods of the channel may use the command then' +
    ' type the new title afterwards to update the stream title.';

  /**
   * The command to handle `!title`. Can either report the current title of the
   * stream for anyone, or a moderator/the streamer can update the title from
   * this command.
   *
   * @param {string} command - The command, which may include the updated title.
   * @param {ChatUserstate} context - The userstate of the user who did command.
   * @returns {string} - The current title, or a message saying the title was
   *                     updated.
   */
  public async exec(command: string, context: ChatUserstate): Promise<string> {
    if (command === 'title' || !context.mod) {
      const { title } = await TwitchApi.Channel.getInfo();

      return title;
    }

    // By this point, where know there is more to the title.
    const title = command.replace('title ', '');

    if (await TwitchApi.Channel.updateInfo({ title })) {
      return 'Title updated successfully';
    }

    return 'Attempted to udpate, but something went wrong';
  }
}

export default new Title();