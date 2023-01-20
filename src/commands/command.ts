/**
 * This will stand as the definition for commands.
 * All commands within the `commands/` folder should
 * implement this interface.
 */
export default interface Command {
  // Name of the command that will be sent from chat
  command: string;

  // How to use the command
  instruction: string;

  /**
   * This shall serve as the execution when a command
   * is entered in chat.
   *
   * @param {Array<any>} args - If any are necessary
   * @returns {string|Promise<string>} - The string response.
   */
  exec(...args: any[]): string | Promise<string>;
}
