import { random } from "faker";
import {
  createConnection,
  getConnectionOptions,
  getConnection as getTypeormCon,
} from "typeorm";
import connect, { getConnection } from "@database";

jest.mock("../../src/database/entities/viewer", () => jest.fn());
jest.mock("typeorm");
const mockCreate = createConnection as jest.Mock;
const mockGetConnect = getConnectionOptions as jest.Mock;
const mockGetConnection = getTypeormCon as jest.Mock;

describe("Database", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("connectToDb", () => {
    it("should call both typeorm functions for setting options and creating a connection", async () => {
      await connect();

      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockGetConnect).toHaveBeenCalledTimes(1);
    });
  });

  describe("getConnection", () => {
    let connection;

    beforeEach(() => {
      connection = { id: random.number() };

      mockGetConnection.mockReturnValue(connection);
    });

    it("should call TypeORM's get connection call, and return what it returns", () => {
      const actual = getConnection();

      expect(mockGetConnection).toHaveBeenCalledTimes(1);
      expect(actual).toStrictEqual(connection);
    });
  });
});
