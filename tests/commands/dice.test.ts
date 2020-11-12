import { name, random } from "faker";
import rollDice from "../../src/commands/dice";

const getValueRolled = (message: string): number => {
  return Number(message.split(" ")[3].slice(0, -1));
};

const getName = (message: string): string => {
  return message.split(" ")[0];
};

describe("rollDice", () => {
  it("should roll a d20 if no value is provided", () => {
    const rolled = getValueRolled(rollDice());

    expect(rolled).toBeLessThanOrEqual(20);
    expect(rolled).toBeGreaterThan(0);
  });

  it("should roll between 0 and a number provided", () => {
    const val = random.number();
    const rolled = getValueRolled(rollDice(val));

    expect(rolled).toBeLessThanOrEqual(val);
    expect(rolled).toBeGreaterThan(0);
  });

  it("should roll between 0 and the Math.floor() of a float provided", () => {
    const val = random.float();
    const rolled = getValueRolled(rollDice(val));

    expect(rolled).toBeLessThanOrEqual(Math.floor(val));
    expect(rolled).toBeGreaterThan(0);
  });

  it('should return "You" if no name is provided', () => {
    const username = getName(rollDice());

    expect(username).toBe("You");
  });

  it("shoud return the name provided in the message", () => {
    const username = name.firstName();
    const actual = getName(rollDice(2, username));

    expect(actual).toBe(username);
  });

  it("should return a string following the regex", () => {
    const message = rollDice();

    expect(message).toMatch(/^[A-Za-z0-9_]+ rolled a [0-9]+!$/);
  });
});
