import ManageCmds from '../../../src/command/commands/manageCmds';
import { deleteCmd, upsertCmd } from '../../../src/database/repositories/cmd';

jest.mock('../../../src/database/repositories/cmd')
const mockDeleteCmd = deleteCmd as jest.Mock;
const mockUpsertCmd = upsertCmd as jest.Mock;

// Test file assumes the caller has already been validated as a moderator.
describe('Manage Commands', () => {
  const COMMAND = 'someSillyCommand';
  const RESPONSE = 'Some Silly Response to the Channel';

  afterEach(() => jest.resetAllMocks());

  it('should call upsertCmd with provided params', async () => {
    const actual = await ManageCmds.exec({ command: `addcom ${COMMAND} ${RESPONSE}` });

    expect(mockUpsertCmd).toHaveBeenCalledWith(COMMAND, RESPONSE);
    expect(actual).toBe(`Command !${COMMAND} added successfully`);
  });

  it('should call upsertCmd with provided params', async () => {
    const actual = await ManageCmds.exec({ command: `delcom ${COMMAND}` });

    expect(mockDeleteCmd).toHaveBeenCalledWith(COMMAND);
    expect(actual).toBe(`Command !${COMMAND} has been removed`);
  });

  it('should not call deleteCmd when extra text is provided', async () => {
    const actual = await ManageCmds.exec({ command: `delcom ${COMMAND} extra unnecessary stuff`});

    expect(mockDeleteCmd).not.toHaveBeenCalled();
    expect(actual).toBe('');
  })
});
