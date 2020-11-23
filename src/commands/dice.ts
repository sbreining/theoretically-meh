import Command from "./command";

class RollDice implements Command {
  public command = "roll";

  public instruction =
    'To roll dice, simply do "!roll [number]" where the number is optional. ' +
    "Rolling defaults to 20 if no number is provided.";

  /**
   * Will roll a `sides` die and return the sentence telling `name` what
   * was rolled. Will default to "You" in the basense of `name`, and
   * default to a 20 sided die.
   *
   * @param {number} sides - The number of sides on the die.
   * @param {string} name - The name of the person who rolled.
   * @return {string} - The sentence that reads what `name` rolled.
   */
  public exec(sides = 0, name = "You"): string {
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
