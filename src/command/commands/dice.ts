import { CommandArgs, UserCommand } from './command';

class RollDice extends UserCommand {
  public readonly command = 'roll';

  /**
   * Will roll a `sides` die and return the sentence telling `name` what
   * was rolled. Will default to 'You' in the basense of `name`, and
   * default to a 20 sided die.
   */
  public exec(
    {
      command,
      context: { 'display-name': name = 'You' }
    }: CommandArgs
  ): string {
    let sides = Number(command?.split(' ')[1]) || null;

    if (!sides || sides < 1) {
      sides = 20;
    }

    if (!Number.isInteger(sides)) {
      sides = Math.floor(sides);
    }

    const valueRolled = Math.floor(Math.random() * sides) + 1;

    return `${name} rolled a ${valueRolled}!`;
  }
}

export default new RollDice();
