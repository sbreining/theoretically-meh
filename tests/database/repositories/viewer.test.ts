import { internet, random } from "faker";
import {
  create,
  find,
  getViewerByName,
} from "../../../src/database/repositories/viewer";

describe("Viewer Repository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    let username: string;
    let connection;
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
      connection = { createQueryBuilder };
    });

    it("should create a new user and call find()", async () => {
      const actual = await create(username, connection);

      expect(values).toHaveBeenCalledWith({
        name: username.toLowerCase(),
        points: 1,
      });
      expect(actual).toBe(id);
    });
  });
});
