import { ChatUserstate } from "tmi.js";

export type CommandArgs = {
  command?: string;
  context?: ChatUserstate;
};

interface Command {
  /**
   * This shall serve as the execution when a command
   * is entered in chat.
   *
   * @param {CommandArgs} args - If any are necessary
   * @returns {string|Promise<string>} - The string response.
   */
  exec(args?: CommandArgs): string | Promise<string>;
}

/**
 * This will stand as the definition for commands.
 * All commands within the `commands/` folder should
 * implement this interface.
 */
export abstract class UserCommand implements Command {
  public readonly IS_MOD_CMD = false;

  // Name of the command that will be sent from chat
  abstract command: string;

  // How to use the command
  abstract instruction: string;

  abstract exec(args?: CommandArgs): string | Promise<string>;
}

export abstract class ModCommand implements Command {
  public readonly IS_MOD_CMD = true;

  abstract exec(args?: CommandArgs): string | Promise<string>;
}
