import { ChatUserstate } from "tmi.js";

export type CommandArgs = {
  command?: string;
  context?: ChatUserstate;
};

/**
 * This will stand as the definition for commands.
 * All commands within the `commands/` folder should
 * implement this interface.
 */
export abstract class UserCommand {
  public readonly IS_MOD_CMD = false;

  // Name of the command that will be sent from chat
  abstract command: string;

  // How to use the command
  abstract instruction: string;

  /**
   * This shall serve as the execution when a command
   * is entered in chat.
   *
   * @param {CommandArgs} args - If any are necessary
   * @returns {string|Promise<string>} - The string response.
   */
  abstract exec(args?: CommandArgs): string | Promise<string>;
}

export abstract class ModCommand {
  public readonly IS_MOD_CMD = true;

  /**
   * This shall serve as the execution when a command
   * is entered in chat.
   *
   * @param {CommandArgs} args - If any are necessary
   * @returns {string|Promise<string>} - The string response.
   */
  abstract exec(args?: CommandArgs): string | Promise<string>;
}
