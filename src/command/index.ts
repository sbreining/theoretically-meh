import { ChatUserstate } from 'tmi.js';
import commands from './commands';

/**
 * Executes `command` and calls appropriate fucntion to handle the command.
 * This is async, because this is where all the magic happens.
 *
 * @param {string} command - Will dictate which command is executed.
 * @param {ChatUserstate} context - This is a collection of details about the
 *                                  user.
 * @return {Promise<string>} - The message, split into pieces of 500 characters,
 *                             to ensure not to reach character limit.
 */
export default async function executeCommand(
  command: string,
  context: ChatUserstate,
): Promise<string> {
  const cmd = command.split(' ')[0];

  if (!commands[cmd]) return '';

  return await commands[cmd].exec({ command, context });
}
