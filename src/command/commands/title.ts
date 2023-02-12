import TwitchApi from "../../api/twitch";
import config from "../../utility/config";
import { CommandArgs, UserCommand } from "./command";

class Title extends UserCommand {
  public readonly command = 'title';

  /**
   * The command to handle `!title`. Can either report the current title of the
   * stream for anyone, or a moderator/the streamer can update the title from
   * this command.
   */
  public async exec(
    {
      command,
      context: { mod: isMod, 'display-name': name}
    }: CommandArgs
  ): Promise<string> {
    // If there is more to the title, update if user is mod, otherwise, early
    // exit. Plain users should just use "!title"
    if (command != 'title') {
      const hasAuth = name.toLowerCase() == config.twitch.channel || isMod;

      return hasAuth ? await this.updateTitle(command) : '';
    }

    const { title } = await TwitchApi.Channel.getInfo();

    return title;
  }

  private async updateTitle(command: string): Promise<string> {
    const title = command.replace('title ', '');

   return await TwitchApi.Channel.updateInfo({ title }) ?
      'Title updated successfully' :
      'Attempted to update, but something went wrong';
  }
}

export default new Title();
