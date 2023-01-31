import { faker } from '@faker-js/faker';
import dice from '../../../src/command/commands/dice';
import discord from '../../../src/command/commands/discord';
import eight from '../../../src/command/commands/eightBall';
import howTo from '../../../src/command/commands/howTo';
import points from '../../../src/command/commands/points';
import welcome from '../../../src/command/commands/welcome';

describe('howTo', () => {
  it('should return the explanation for how to roll the dice', () => {
    expect(howTo.exec({ command: `howTo ${dice.command}`})).toBe(dice.instruction);
  });

  it('should return the explanation for how to use the discord command', () => {
    expect(howTo.exec({ command: `howTo ${discord.command}`})).toBe(discord.instruction);
  });

  it('should return the explanation for how to use the 8ball command', () => {
    expect(howTo.exec({ command: `howTo ${eight.command}` })).toBe(eight.instruction);
  });

  it('should return the explanation for how to use howTo for any random word', () => {
    expect(howTo.exec({ command: `howTo ${faker.random.word()}`})).toBe(howTo.instruction);
  });

  it('should return the explanation for how to use howTo for no word', () => {
    expect(howTo.exec()).toBe(howTo.instruction);
  });

  it('should return the explanation for how to use points', () => {
    expect(howTo.exec({ command: `howTo ${points.command}` })).toBe(points.instruction);
  });

  it('should return the explanation for how to use the welcome command', () => {
    expect(howTo.exec({ command: `howTo ${welcome.command}` })).toBe(welcome.instruction);
  });
});
