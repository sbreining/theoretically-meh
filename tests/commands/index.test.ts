import { name, random } from "faker";
import execute, { commands } from "@commands";
import dice from "@commands/dice";
import discord from "@commands/discord";
import howTo from "@commands/howTo";
import points from "@commands/points";
import welcome from "@commands/welcome";

// !discord
jest.mock("../../src/commands/discord");
const mockDiscord = discord.exec as jest.Mock;

// !howTo
jest.mock("../../src/commands/howTo");
const mockHowTo = howTo.exec as jest.Mock;

// !points
jest.mock("../../src/commands/points");
const mockPoints = points.exec as jest.Mock;

// !roll
jest.mock("../../src/commands/dice");
const mockRoll = dice.exec as jest.Mock;

// !welcome
jest.mock("../../src/commands/welcome")
const mockWelcome = welcome.exec as jest.Mock;

describe("execute", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty string when the command is not recognized", async () => {
    const word = random.word();
    const actual = await execute(word, {});

    expect(actual).toBe("");
  });

  it('should return whatever "splitMessage" returns', async () => {
    const actual = await execute(commands, {});

    expect(actual).toContain("The list of available commands are: ");
  });

  describe("!discord", () => {
    let returnValue: string;

    beforeEach(() => {
      returnValue = random.word();
      mockDiscord.mockReturnValue(returnValue);
    });

    it('should return whatever "discord" returns', async () => {
      const command = discord.command;
      const actual = await execute(command, {});

      expect(actual).toStrictEqual(returnValue);
    });
  });

  describe("!howTo", () => {
    let returnValue: string;

    beforeEach(() => {
      returnValue = random.word();
      mockHowTo.mockReturnValue(returnValue);
    });

    it('should call "howTo" with the command name', async () => {
      const word = random.word();
      const command = howTo.command + " " + word;

      await execute(command, {});

      expect(mockHowTo).toHaveBeenCalledTimes(1);
      expect(mockHowTo).toHaveBeenCalledWith(word);
    });

    it('should return whatever "howTo" returns', async () => {
      const command = howTo.command;
      const actual = await execute(command, {});

      expect(actual).toStrictEqual(returnValue);
    });
  });

  describe("!points", () => {
    let returnValue: string;

    beforeEach(() => {
      returnValue = random.word();
      mockPoints.mockReturnValue(returnValue);
    });

    it("shouold call points.exec() with", async () => {
      const username = name.firstName();
      const command = points.command;

      await execute(command, { "display-name": username });

      expect(mockPoints).toHaveBeenCalledTimes(1);
      expect(mockPoints).toHaveBeenCalledWith(username);
    });

    it("should return whatever points.exec() returns", async () => {
      const command = points.command;
      const actual = await execute(command, {});

      expect(actual).toStrictEqual(returnValue);
    });
  });

  describe("!roll", () => {
    let returnValue: string;

    beforeEach(() => {
      returnValue = random.word();
      mockRoll.mockReturnValue(returnValue);
    });

    it('should call "rollDice" with provided arguments', async () => {
      const sides = random.number();
      const command = dice.command + " " + sides;
      const firstName = name.firstName();

      await execute(command, { "display-name": firstName });

      expect(mockRoll).toHaveBeenCalledTimes(1);
      expect(mockRoll).toHaveBeenCalledWith(sides, firstName);
    });

    it('should return whatever "rollDice" returns', async () => {
      const command = dice.command;
      const actual = await execute(command, {});

      expect(actual).toStrictEqual(returnValue);
    });
  });

  describe("!welcome", () => {
    let returnValue: string;

    beforeEach(() => {
      returnValue = random.word();
      mockWelcome.mockReturnValue(returnValue);
    });

    it('should return whatever "welcome" returns', async () => {
      const command = welcome.command;
      const actual = await execute(command, {});

      expect(actual).toStrictEqual(returnValue);
    });
  });
});
