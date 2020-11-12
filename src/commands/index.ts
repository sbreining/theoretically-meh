import { splitMessage } from "../utility/string";
import rollDice, { COMMAND_ROLL } from "./dice";
import howTo, { COMMAND_HOWTO } from "./howTo";

export const COMMAND_AVAILABLE = "availCom";
const availableCommands = [COMMAND_AVAILABLE, COMMAND_ROLL, COMMAND_HOWTO];
const availableMessage = `The list of available commands are: ${availableCommands.join(", ")}`;

/**
 * Executes `command` and calls appropriate fucntion to handle
 * the command. This is async, because this is where all the
 * magic happens.
 *
 * @param {string} command - Will dictate which command is executed.
 * @param {Record} context - This is a collection of details
 *                           about the user.
 * @return {Promise<Array<string>>} - The message, split into pieces
 *                                    of 500 characters, to ensure not
 *                                    to reach character limit.
 */
export default async function executeCommand(command: string, context: Record<string, any>): Promise<Array<string>> {
  const list = command.split(" ");

  switch (list[0]) {
    case COMMAND_AVAILABLE:
      return splitMessage(availableMessage);
    case COMMAND_ROLL:
      const sides = Number(list[1]);
      return [rollDice(sides, context["display-name"])];
    case COMMAND_HOWTO:
      return [howTo(list[1])];
    default:
      return;
  }
}
