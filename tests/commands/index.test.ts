import { name, random } from "faker";
import executeCommand, { COMMAND_AVAILABLE } from "../../src/commands";
import rollDice, { COMMAND_ROLL } from "../../src/commands/dice";
import howTo, { COMMAND_HOWTO } from "../../src/commands/howTo";
import { splitMessage } from "../../src/utility/string";

// rollDice mock.
jest.mock("../../src/commands/dice");
const mockRoll = rollDice as jest.Mock;

// howTo mock.
jest.mock("../../src/commands/howTo");
const mockHowTo = howTo as jest.Mock;

jest.mock("../../src/utility/string");
const mockSplitMessage = splitMessage as jest.Mock;

let mockRollReturnVal: string;
let mockHowToReturnVal: string;
let mockSplitMessageReturnVal: Array<string>;

describe("executeCommand", () => {
  beforeEach(() => {
    // mockRoll
    mockRollReturnVal = random.word();
    mockRoll.mockReturnValue(mockRollReturnVal);

    // mockHowTo
    mockHowToReturnVal = random.word();
    mockHowTo.mockReturnValue(mockHowToReturnVal);

    // mockSplitMessage
    mockSplitMessageReturnVal = [random.words(random.number())];
    mockSplitMessage.mockReturnValue(mockSplitMessageReturnVal);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call "rollDice" with provided arguments', async () => {
    const sides = random.number();
    const command = COMMAND_ROLL + " " + sides;
    const firstName = name.firstName();

    await executeCommand(command, { "display-name": firstName });

    expect(mockRoll).toHaveBeenCalledTimes(1);
    expect(mockRoll).toHaveBeenCalledWith(sides, firstName);
  });

  it('should return whatever "rollDice" returns', async () => {
    const command = COMMAND_ROLL;
    const actual = await executeCommand(command, {});

    expect(actual).toStrictEqual([mockRollReturnVal]);
  });

  it('should call "howTo" with the command name', async () => {
    const word = random.word();
    const command = COMMAND_HOWTO + " " + word;

    await executeCommand(command, {});

    expect(mockHowTo).toHaveBeenCalledTimes(1);
    expect(mockHowTo).toHaveBeenCalledWith(word);
  });

  it('should return whatever "howTo" returns', async () => {
    const command = COMMAND_HOWTO;
    const actual = await executeCommand(command, {});

    expect(actual).toStrictEqual([mockHowToReturnVal]);
  });

  it("should return nothing when the command is not recognized", async () => {
    const word = random.word();
    const actual = await executeCommand(word, {});

    expect(actual).toBeUndefined();
  });

  it('should call "splitMessage" when asking for the available commands', async () => {
    await executeCommand(COMMAND_AVAILABLE, {});

    expect(mockSplitMessage).toHaveBeenCalledTimes(1);
  });

  it('should return whatever "splitMessage" returns', async () => {
    const actual = await executeCommand(COMMAND_AVAILABLE, {});

    expect(actual).toStrictEqual(mockSplitMessageReturnVal);
  });
});
