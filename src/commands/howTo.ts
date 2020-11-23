import Command from "./command";
import dice from "./dice";
import discord from "./discord";

class HowTo implements Command {
  public command = "howTo";

  public instruction =
    'To learn how to use a command, simply do "!howTwo [command]"';

  /**
   * When passed `command`, a description will be returned explaining
   * how to use `command`.
   *
   * @param {string|undefined} command - The command to learn how to use.
   */
  public exec(command?: string): string {
    switch (command) {
      case dice.command:
        return dice.instruction;
      case discord.command:
        return discord.instruction;
      default:
        return this.instruction;
    }
  }
}

export default new HowTo();
