import { faker } from '@faker-js/faker';
import { ChatUserstate } from 'tmi.js';
import exec from '../../src/command';
import { getCmd } from '../../src/database/repositories/cmd';
import commands from '../../src/command/commands';
import { ModCommand, UserCommand } from '../../src/command/commands/command';

jest.mock('../../src/database/repositories/cmd');
const mockGetCmd = getCmd as jest.Mock;

const USER_COMMAND = 'fakecommand';
const USER_RESPONSE = 'Some type of response';
class FakeUserCmd extends UserCommand {
  public readonly command = USER_COMMAND;
  public exec(args: any) { return USER_RESPONSE; }
}

const MOD_COMMAND = 'othercommand';
const MOD_RESPONSE = 'Some modular response';
class FakeModCmd extends ModCommand {
  public exec(args: any) { return MOD_RESPONSE; }
}

describe('Commands', () => {
  beforeAll(() => {
    commands[USER_COMMAND] = new FakeUserCmd();
    commands[MOD_COMMAND] = new FakeModCmd();
  });

  afterEach(() => jest.clearAllMocks());

  let context: ChatUserstate;

  describe('User commands', () => {
    beforeAll(() => {
      context = {
        'display-name': faker.internet.userName(),
        mod: false,
      }
    });

    describe('Command does not exist', () => {
      beforeEach(() => {
        mockGetCmd.mockResolvedValue(null);
      });

      it('should call the repository function to find the command', async () => {
        const cmd = 'non-existent-command';
        await exec(cmd, context);

        expect(mockGetCmd).toHaveBeenCalledWith(cmd);
      });

      it('should return an empty string if command not found', async () => {
        const actual = await exec('other-non-existent-command', context);

        expect(actual).toBe('');
      });
    });

    describe('Command exists in DB, not code', () => {
      const cmd = 'command-in-db';
      const expected = 'This is the response to the command.';

      beforeEach(() => {
        mockGetCmd.mockResolvedValue({ response: expected });
      });

      it('should return the response that was saved in the DB', async () => {
        const actual = await exec(cmd, context);

        expect(actual).toBe(expected);
      });
    });

    describe('Command in code is exectued', () => {
      it('should return the response', async () => {
        const actual = await exec(USER_COMMAND, context);

        expect(actual).toBe(USER_RESPONSE);
      });

      it('should return empty string when a user tries a mod command', async () => {
        const actual = await exec(MOD_COMMAND, context);

        expect(actual).toBe('');
      });
    });
  });

  describe('Mod commands', () => {
    beforeAll(() => {
      context = {
        'display-name': faker.internet.userName(),
        mod: true,
      }
    });

    it('should allow a mod to exectue a user command', async () => {
      const actual = await exec(USER_COMMAND, context);

      expect(actual).toBe(USER_RESPONSE);
    });

    it('should allow the moderator to execute a mod command', async () => {
      const actual = await exec(MOD_COMMAND, context);

      expect(actual).toBe(MOD_RESPONSE);
    });
  });
});
