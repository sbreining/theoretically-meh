import { COMMAND_ROLL, DICE_HOW_TO } from "./dice";

export const COMMAND_HOWTO = "howTo";

export const HOWTO_HOW_TO =
  'To learn how to use a command, simply do "!howTwo [command]"';

/**
 * When passed `command`, a description will be returned explaining
 * how to use `command`.
 *
 * @param {string} command - The command to learn how to use.
 */
export default function howTo(command: string): string {
  switch (command) {
    case COMMAND_ROLL:
      return DICE_HOW_TO;
    default:
      return HOWTO_HOW_TO;
  }
}
