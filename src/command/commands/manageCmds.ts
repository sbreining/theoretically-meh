import { deleteCmd, upsertCmd } from '../../database/repositories/cmd';
import { CommandArgs, ModCommand } from './command';

class ManageCmds extends ModCommand {

  /**
   * The ability for moderators of the streamers channel to add or remove custom
   * text based commands. These commands can only respond with text.
   */
  public async exec({ command }: CommandArgs): Promise<string> {
    const [botCommand, cmd] = this.splitCommand(command);

    return botCommand === 'addcom' ? this.addcom(cmd) : this.delcom(cmd);
  }

  /***********************
   *  Private Functions  *
   ***********************/

  private async addcom(cmd: string): Promise<string> {
    const [command, response] = this.splitCommand(cmd);

    await upsertCmd(command, response);

    return `Command !${command} added successfully`;
  }

  private async delcom(cmd: string): Promise<string> {
    // If there are more words, it is bad input. Moderators are not told when
    // they are wrong.
    if (cmd.split(' ').length != 1 || cmd.length < 1) return '';

    await deleteCmd(cmd);

    return `Command !${cmd} has been removed.`;
  }

  private splitCommand(str: string): string[] {
    const idx = str.indexOf(' ');

    const cmd = str.substring(0, idx);
    const response = str.substring(idx + 1);

    return [cmd, response];
  }
}

export default new ManageCmds();
