import { ChatUserstate } from 'tmi.js';
import { getCmd } from '../database/repositories/cmd';
import commands from './commands';
import { ModCommand } from './commands/command';

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
async function exec(command: string, context: ChatUserstate): Promise<string> {
  const cmd = command.split(' ')[0];

  const cmdObject = commands[cmd];
  if (cmdObject) {
    if (cmdObject instanceof ModCommand && !context.mod) return '';

    return await cmdObject.exec({ command, context });
  }

  return (await getCmd(cmd))?.response || '';
}

export default exec;
