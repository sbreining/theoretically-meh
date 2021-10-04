import { datatype, internet } from 'faker';
import { getConnection } from '@database';
import { Viewer } from '@entities/viewer';
import { addPointsByName, create, find, findByName } from '@repositories/viewer';
import { getRepository } from 'typeorm';

jest.mock('../../../src/database/entities/viewer');
jest.mock('../../../src/database/entities/token');

jest.mock('../../../src/database');
const mockGetConnection = getConnection as jest.Mock;

jest.mock('typeorm');
const mockGetRepository = getRepository as jest.Mock;

describe('Viewer Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addPointsByName', () => {
    const getOne = jest.fn();
    let where: jest.Mock;
    let insert: jest.Mock;
    let save: jest.Mock;

    beforeEach(() => {
      where = jest.fn();
      where.mockReturnValue({ getOne });

      const createQueryBuilder = jest.fn();
      createQueryBuilder.mockReturnValue({ where });

      const getRepository = jest.fn();
      getRepository.mockReturnValue({ createQueryBuilder });

      mockGetConnection.mockReturnValue({ getRepository });

      insert = jest.fn();
      insert.mockResolvedValue({ generatedMaps: [{ id: datatype.number() }] });

      save = jest.fn();

      mockGetRepository.mockReturnValue({ insert, save });
    });

    it('should create a viewer if one is not found, save() should not be called', async () => {
      getOne.mockResolvedValue(undefined);

      const username = internet.userName();
      const points = datatype.number();

      await addPointsByName(username, points);

      expect(insert).toHaveBeenCalledWith({
        name: username.toLowerCase(),
        points,
      });
      expect(save).not.toHaveBeenCalled();
    });

    it('should add points to existing user, and call save()', async () => {
      const priorPoints = datatype.number();
      const viewer = {
        id: datatype.number(),
        name: internet.userName().toLowerCase(),
        points: priorPoints,
        created_at: null,
      };

      getOne.mockResolvedValue(viewer);

      const extraPoints = datatype.number();

      await addPointsByName(viewer.name, extraPoints);

      expect(insert).not.toHaveBeenCalled();
      expect(save).toHaveBeenCalledWith({
        id: viewer.id,
        name: viewer.name,
        points: priorPoints + extraPoints,
        created_at: null,
      });
    });
  });

  describe('create', () => {
    let username: string;
    let id: number;

    beforeEach(() => {
      username = internet.userName();
      id = datatype.number();

      const insert = jest.fn();
      insert.mockResolvedValue({
        generatedMaps: [
          {
            id,
            created_at: new Date(),
          },
        ],
      });

      mockGetRepository.mockReturnValue({ insert });
    });

    it('should create a new user and return the id', async () => {
      const actual = await create(username);

      expect(actual.id).toBe(id);
      expect(actual.created_at).not.toBeNull();
    });
  });

  describe('find', () => {
    let viewer: Viewer;
    let where: jest.Mock;

    beforeEach(() => {
      viewer = {
        id: datatype.number(),
        name: internet.userName(),
        points: datatype.number(),
        created_at: null,
      };

      const getOne = jest.fn();
      getOne.mockResolvedValue(viewer);

      where = jest.fn();
      where.mockReturnValue({ getOne });

      const createQueryBuilder = jest.fn();
      createQueryBuilder.mockReturnValue({ where });

      const getRepository = jest.fn();
      getRepository.mockReturnValue({ createQueryBuilder });

      mockGetConnection.mockReturnValue({ getRepository });
    });

    it('should return a viewer object', async () => {
      const actual = await find(viewer.id);

      expect(where).toHaveBeenCalledWith('id = :id', { id: viewer.id });
      expect(actual).toStrictEqual(viewer);
    });
  });

  describe('findByName', () => {
    let viewer: Viewer;
    let where: jest.Mock;

    beforeEach(() => {
      viewer = {
        id: datatype.number(),
        name: internet.userName(),
        points: datatype.number(),
        created_at: null,
      };

      const getOne = jest.fn();
      getOne.mockResolvedValue(viewer);

      where = jest.fn();
      where.mockReturnValue({ getOne });

      const createQueryBuilder = jest.fn();
      createQueryBuilder.mockReturnValue({ where });

      const getRepository = jest.fn();
      getRepository.mockReturnValue({ createQueryBuilder });

      mockGetConnection.mockReturnValue({ getRepository });
    });

    it('should return a viewer object', async () => {
      const actual = await findByName(viewer.name);

      expect(where).toHaveBeenCalledWith('name = :name', {
        name: viewer.name.toLowerCase(),
      });
      expect(actual).toStrictEqual(viewer);
    });
  });
});
