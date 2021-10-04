import { datatype, date } from 'faker';
import { getConnection } from '@database';
import { updateTokenForService, getTokenForService } from '@repositories/token';
import { getRepository } from 'typeorm';

jest.mock('../../../src/database/entities/viewer');
jest.mock('../../../src/database/entities/token');

jest.mock('../../../src/database');
const mockGetConnection = getConnection as jest.Mock;

jest.mock('typeorm');
const mockGetRepository = getRepository as jest.Mock;

describe('Token Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateTokenForService', () => {
    let token;
    let save: jest.Mock;

    beforeEach(() => {
      token = {
        id: datatype.number(),
        service: 'TWITCH',
        token: datatype.uuid(),
        expiration: date.future().getTime(),
        created_at: date.past().getTime(),
      };

      let getOne = jest.fn();
      getOne.mockResolvedValue(token);

      let where = jest.fn();
      where.mockReturnValue({ getOne });

      let createQueryBuilder = jest.fn();
      createQueryBuilder.mockReturnValue({ where });

      let getRepository = jest.fn();
      getRepository.mockReturnValue({ createQueryBuilder });

      mockGetConnection.mockReturnValue({ getRepository });

      save = jest.fn();

      mockGetRepository.mockReturnValue({ save });
    });

    it("should call save with the updated token model's values", async () => {
      const tokenUuid = datatype.uuid();
      const expiration = date.future().getTime();

      await updateTokenForService('TWITCH', tokenUuid, expiration);

      token.token = tokenUuid;
      token.expiration = expiration;

      expect(save).toHaveBeenCalledWith(token);
    });

    it('should return the updated token object', async () => {
      const tokenUuid = datatype.uuid();
      const expiration = date.future().getTime();

      const actual = await updateTokenForService('TWITCH', tokenUuid, expiration);

      const expected = { ...token, token: tokenUuid, expiration };

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('getTokenForService', () => {
    let token;
    let where: jest.Mock;

    beforeEach(() => {
      token = {
        id: datatype.number(),
        service: 'TWITCH',
        token: datatype.uuid(),
        expiration: date.future().getTime(),
        created_at: date.past().getTime(),
      };

      let getOne = jest.fn();
      getOne.mockResolvedValue(token);

      where = jest.fn();
      where.mockReturnValue({ getOne });

      let createQueryBuilder = jest.fn();
      createQueryBuilder.mockReturnValue({ where });

      let getRepository = jest.fn();
      getRepository.mockReturnValue({ createQueryBuilder });

      mockGetConnection.mockReturnValue({ getRepository });
    });

    it('should get one object from the database', async () => {
      await getTokenForService('TWITCH');

      expect(where).toHaveBeenCalledWith('service = :service', { service: 'TWITCH' });
    });

    it('should return what was found from the database', async () => {
      const actual = await getTokenForService('TWITCH');

      expect(actual).toStrictEqual(token);
    });
  });
});
