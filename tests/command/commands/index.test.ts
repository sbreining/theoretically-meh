import Commands, { userCommands } from '../../../src/command/commands';

describe('Commands Index', () => {
  const expected = `Available commands are: ${userCommands.join(', ')}`;

  it('should return available user commands', () => {
    const actual = Commands.commands.exec()

    expect(actual).toBe(expected);
  });
});
