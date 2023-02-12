import GameCommand from '../../../src/command/commands/game';
import { updateInfo } from '../../../src/api/twitch/channel';

jest.mock('../../../src/api/twitch/channel');
const mockUpdateInfo = updateInfo as jest.Mock;

describe('Game Command', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call the twitch API with a game id', async () => {
    const response = await GameCommand.exec({ command: 'game software' });

    expect(mockUpdateInfo).toHaveBeenCalledWith({ game_id: '1469308723' });
    expect(response).toBe('')
  });
});
