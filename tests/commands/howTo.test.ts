import { random } from "faker";
import { COMMAND_ROLL, DICE_HOW_TO } from "../../src/commands/dice";
import howTo, { HOWTO_HOW_TO } from "../../src/commands/howTo";

describe("howTo", () => {
  it("should return the explanation for how to roll the dice", () => {
    expect(howTo(COMMAND_ROLL)).toBe(DICE_HOW_TO);
  });

  it("should return the explanation for how to use howTo for any random word", () => {
    expect(howTo(random.word())).toBe(HOWTO_HOW_TO);
  });
});
