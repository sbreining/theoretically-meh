import { random } from "faker";
import dice from "../../src/commands/dice";
import discord from "../../src/commands/discord";
import howTo from "../../src/commands/howTo";

describe("howTo", () => {
  it("should return the explanation for how to roll the dice", () => {
    expect(howTo.exec(dice.command)).toBe(dice.instruction);
  });

  it("should return the explanation for how to use the discord command", () => {
    expect(howTo.exec(discord.command)).toBe(discord.instruction);
  });

  it("should return the explanation for how to use howTo for any random word", () => {
    expect(howTo.exec(random.word())).toBe(howTo.instruction);
  });

  it("should return the explanation for how to use howTo for no word", () => {
    expect(howTo.exec()).toBe(howTo.instruction);
  });
});
