import discord from '../../../src/command/commands/discord';

describe('discord', () => {
  it('should return the expected message', () => {
    const actual = discord.exec();

    expect(actual).toContain('All are welcome to join the den. Find your way: ');
  });
});
