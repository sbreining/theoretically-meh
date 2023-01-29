import { ChatUserstate } from "tmi.js";
import { updateChannelInfo } from "../api/twitch";
import Command from "./command";

class Title implements Command {
  public readonly command = 'title';

  public readonly instruction =
    ''

  public async exec(command: string, context: ChatUserstate): Promise<string> {
    if (command === 'title' || !context.mod) {
      // Return the current title
      // TODO: https://dev.twitch.tv/docs/api/reference/#get-channel-information
      return '';
    }

    // By this point, where know there is more to the title.
    const title = command.replace('title ', '');

    if (await updateChannelInfo({ title })) {
      return 'Title updated successfully';
    }

    return 'Attempted to udpate, but something went wrong';
  }
}

export default new Title();