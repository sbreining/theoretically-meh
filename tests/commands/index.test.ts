import { name, random } from "faker";
import executeCommand, { commands } from "../../src/commands";
import dice from "../../src/commands/dice";
import discord from "../../src/commands/discord";
import howTo from "../../src/commands/howTo";
import { splitMessage } from "../../src/utility/string";

// rollDice mock.
jest.mock("../../src/commands/dice");
const mockRoll = dice.exec as jest.Mock;

// discord mock.
jest.mock("../../src/commands/discord");
const mockDiscord = discord.exec as jest.Mock;

// howTo mock.
jest.mock("../../src/commands/howTo");
const mockHowTo = howTo.exec as jest.Mock;

// string utility mock
jest.mock("../../src/utility/string");
const mockSplitMessage = splitMessage as jest.Mock;

let mockRollReturnVal: string;
let mockHowToReturnVal: string;
let mockDiscordReturnVal: string;

describe("executeCommand", () => {
  beforeEach(() => {
    // mockRoll
    mockRollReturnVal = random.word();
    mockRoll.mockReturnValue(mockRollReturnVal);

    // mockHowTo
    mockHowToReturnVal = random.word();
    mockHowTo.mockReturnValue(mockHowToReturnVal);

    // mockDiscord
    mockDiscordReturnVal = random.word();
    mockDiscord.mockReturnValue(mockDiscordReturnVal);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call "rollDice" with provided arguments', async () => {
    const sides = random.number();
    const command = dice.command + " " + sides;
    const firstName = name.firstName();

    await executeCommand(command, { "display-name": firstName });

    expect(mockRoll).toHaveBeenCalledTimes(1);
    expect(mockRoll).toHaveBeenCalledWith(sides, firstName);
  });

  it('should return whatever "rollDice" returns', async () => {
    const command = dice.command;
    const actual = await executeCommand(command, {});

    expect(actual).toStrictEqual(mockRollReturnVal);
  });

  it('should return whatever "discord" returns', async () => {
    const command = discord.command;
    const actual = await executeCommand(command, {});

    expect(actual).toStrictEqual(mockDiscordReturnVal);
  });

  it('should call "howTo" with the command name', async () => {
    const word = random.word();
    const command = howTo.command + " " + word;

    await executeCommand(command, {});

    expect(mockHowTo).toHaveBeenCalledTimes(1);
    expect(mockHowTo).toHaveBeenCalledWith(word);
  });

  it('should return whatever "howTo" returns', async () => {
    const command = howTo.command;
    const actual = await executeCommand(command, {});

    expect(actual).toStrictEqual(mockHowToReturnVal);
  });

  it("should return an empty string when the command is not recognized", async () => {
    const word = random.word();
    const actual = await executeCommand(word, {});

    expect(actual).toBe("");
  });

  it('should return whatever "splitMessage" returns', async () => {
    const actual = await executeCommand(commands, {});

    expect(actual).toContain("The list of available commands are: ");
  });
});
