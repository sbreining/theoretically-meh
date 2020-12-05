import { createConnection, getConnectionOptions } from "typeorm";
import { Viewer } from "../../src/database/entities/viewer";
import connectToDb from "../../src/database";

jest.mock("../../src/database/entities/viewer", () => jest.fn());
jest.mock("typeorm");
const mockCreate = createConnection as jest.Mock;
const mockGetConnect = getConnectionOptions as jest.Mock;

describe("connectToDb", () => {
  it("should call both typeorm functions for setting options and creating a connection", (done) => {
    connectToDb().then(() => {
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockGetConnect).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
