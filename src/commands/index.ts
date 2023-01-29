import { ChatUserstate } from 'tmi.js';
import dice from './dice';
import discord from './discord';
import eight from './eightBall';
import howTo from './howTo';
import points from './points';
import title from './title';
import welcome from './welcome';

export const commands = 'commands';

const availableCommands = [
  dice.command,
  discord.command,
  eight.command,
  howTo.command,
  points.command,
  welcome.command,
];

const joinedCommands = availableCommands.join(', ');
const availableMessage = `The list of available commands are: ${joinedCommands}`;

/**
 * Executes `command` and calls appropriate fucntion to handle the command. This is async,
 * because this is where all the magic happens.
 *
 * @param {string} command - Will dictate which command is executed.
 * @param {ChatUserstate} context - This is a collection of details about the user.
 * @return {Promise<string>} - The message, split into pieces of 500 characters, to ensure not
 *                             to reach character limit.
 */
export default async function executeCommand(command: string, context: ChatUserstate): Promise<string> {
  const list = command.split(' ');

  let message: string;

  switch (list[0]) {
    case commands:
      message = availableMessage;
      break;

    case dice.command:
      const sides = Number(list[1]);
      message = dice.exec(sides, context['display-name']);
      break;

    case discord.command:
      message = discord.exec();
      break;

    case eight.command:
      message = eight.exec(command);
      break;

    case howTo.command:
      message = howTo.exec(list[1]);
      break;

    case points.command:
      message = await points.exec(context['display-name']);
      break;

    case title.command:
      message = await title.exec(command, context);
      break;

    case welcome.command:
      message = welcome.exec();
      break;

    default:
      message = '';
  }

  return message;
}
