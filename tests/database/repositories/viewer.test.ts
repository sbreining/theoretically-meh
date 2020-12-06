import { internet, random } from "faker";
import { getConnection } from "../../../src/database";
import { Viewer } from "../../../src/database/entities/viewer";
import {
  create,
  find,
  findByName,
} from "../../../src/database/repositories/viewer";

jest.mock("../../../src/database");
const mockGetConnection = getConnection as jest.Mock;

describe("Viewer Repository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    let username: string;
    let id;
    let values;

    beforeEach(() => {
      username = internet.userName();
      id = random.number();

      const execute = jest.fn();
      execute.mockResolvedValue({ identifiers: [{ id }] });

      values = jest.fn();
      values.mockReturnValue({ execute });

      const into = jest.fn();
      into.mockReturnValue({ values });

      const insert = jest.fn();
      insert.mockReturnValue({ into });

      const createQueryBuilder = jest.fn();
      createQueryBuilder.mockReturnValue({ insert });
      mockGetConnection.mockReturnValue({ createQueryBuilder });
    });

    it("should create a new user and return the id", async () => {
      const actual = await create(username);

      expect(values).toHaveBeenCalledWith({
        name: username.toLowerCase(),
        points: 1,
      });
      expect(actual).toBe(id);
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

    it("should return a viewer object", async () => {
      const actual = await findByName(viewer.name);

      expect(where).toHaveBeenCalledWith("name = :name", {
        name: viewer.name.toLowerCase(),
      });
      expect(actual).toStrictEqual(viewer);
    });
  });
});
