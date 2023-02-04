import { ChatUserstate } from 'tmi.js';

export type CommandArgs = {
  command?: string;
  context?: ChatUserstate;
};

interface Command {
  /**
   * This shall serve as the execution when a command is entered in chat.
   *
   * @param {CommandArgs} args - If any are necessary
   * @returns {string|Promise<string>} - The string response.
   */
  exec(args?: CommandArgs): string | Promise<string>;
}

/**
 * All user commands that don't require mod status should extend this class.
 */
export abstract class UserCommand implements Command {
  public readonly IS_MOD_CMD = false;

  // Name of the command that will be sent from chat
  abstract command: string;

  abstract exec(args?: CommandArgs): string | Promise<string>;
}

/**
 * All commands that require mod status should extend this class and a check
 * will be performed before exectuing the `exec` functionality.
 */
export abstract class ModCommand implements Command {
  public readonly IS_MOD_CMD = true;

  abstract exec(args?: CommandArgs): string | Promise<string>;
}
