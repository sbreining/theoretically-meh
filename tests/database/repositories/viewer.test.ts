import { internet, random } from "faker";
import { getConnection } from "@database";
import { Viewer } from "@entities/viewer";
import {
  addPointsByName,
  create,
  find,
  findByName,
} from "@repositories/viewer";
import { getRepository } from "typeorm";

jest.mock("../../../src/database/entities/viewer");
jest.mock("../../../src/database/entities/token");

jest.mock("../../../src/database");
const mockGetConnection = getConnection as jest.Mock;

jest.mock("typeorm");
const mockGetRepository = getRepository as jest.Mock;

function setReturnOfTypeOrmCalls(where: jest.Mock, viewer?: Record<string, any>) {
  const getOne = jest.fn();
  getOne.mockResolvedValue(viewer);

  where.mockReturnValue({ getOne });

  const createQueryBuilder = jest.fn();
  createQueryBuilder.mockReturnValue({ where });

  const getRepository = jest.fn();
  getRepository.mockReturnValue({ createQueryBuilder });

  mockGetConnection.mockReturnValue({ getRepository });
}

describe("Viewer Repository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addPointsByName", () => {
    beforeEach(() => {
      
    });

    it("should create a viewer if one is not found and call save()", async () => {
      setReturnOfTypeOrmCalls(jest.fn(), null);

      const username = internet.userName();
      const points = random.number();

      await addPointsByName(username, points);

    });
  });

  describe("create", () => {
    let username: string;
    let id;

    beforeEach(() => {
      username = internet.userName();
      id = random.number();

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

    it("should create a new user and return the id", async () => {
      const actual = await create(username);

      expect(actual.id).toBe(id);
      expect(actual.created_at).not.toBeNull();
    });
  });

  describe("find", () => {
    let viewer: Viewer;
    let where;

    beforeEach(() => {
      viewer = {
        id: random.number(),
        name: internet.userName(),
        points: random.number(),
        created_at: null,
      };

      where = jest.fn();

      setReturnOfTypeOrmCalls(where, viewer);
    });

    it("should return a viewer object", async () => {
      const actual = await find(viewer.id);

      expect(where).toHaveBeenCalledWith("id = :id", { id: viewer.id });
      expect(actual).toStrictEqual(viewer);
    });
  });

  describe("findByName", () => {
    let viewer: Viewer;
    let where;

    beforeEach(() => {
      viewer = {
        id: random.number(),
        name: internet.userName(),
        points: random.number(),
        created_at: null,
      };

      where = jest.fn();

      setReturnOfTypeOrmCalls(where, viewer);
    });

    it("should return a viewer object", async () => {
      const actual = await findByName(viewer.name);

      expect(where).toHaveBeenCalledWith("name = :name", {
        name: viewer.name.toLowerCase(),
      });
      expect(actual).toStrictEqual(viewer);
    });
  });
});
