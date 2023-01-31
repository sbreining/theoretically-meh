import { faker } from '@faker-js/faker';
import dice from '../../../src/command/commands/dice';

const getValueRolled = (message: string): number => {
  return Number(message.split(' ')[3].slice(0, -1));
};

const getName = (message: string): string => {
  return message.split(' ')[0];
};

describe('rollDice', () => {
  it('should roll a d20 if no value is provided', () => {
    const args = { context: { 'display-name': faker.internet.userName() } };

    const actual = getValueRolled(dice.exec(args));

    expect(actual).toBeLessThanOrEqual(20);
    expect(actual).toBeGreaterThan(0);
  });

  it('should roll between 0 and a number provided', () => {
    const expected = faker.datatype.number();

    const args = {
      command: `roll ${expected}`,
      context: { 'display-name': faker.internet.userName() }
    };

    const actual = getValueRolled(dice.exec(args));

    expect(actual).toBeLessThanOrEqual(expected);
    expect(actual).toBeGreaterThan(0);
  });

  it('should roll between 0 and the Math.floor() of a float provided', () => {
    const expected = 5.5; // random.float() does not guarantee a non #.0 value.

    const args = {
      command: `roll ${expected}`,
      context: { 'display-name': faker.internet.userName() },
    };

    const actual = getValueRolled(dice.exec(args));

    expect(actual).toBeLessThanOrEqual(Math.floor(expected));
    expect(actual).toBeGreaterThan(0);
  });

  it('shoud return the name provided in the message', () => {
    const expected = faker.internet.userName();

    const args = {
      command: 'roll 2',
      context: { 'display-name': expected },
    };

    const actual = getName(dice.exec(args));

    expect(actual).toBe(expected);
  });

  it('should return a string following the regex', () => {
    const message = dice.exec({ context: { 'display-name': faker.internet.userName() } });

    expect(message).toMatch(/^[A-Za-z0-9_.]+ rolled a [0-9]+!$/);
  });
});
