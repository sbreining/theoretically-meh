import { random } from "faker";
import { getRandomInteger, splitMessage } from "../../src/utility";
import { MAX_MESSAGE_LENGTH } from "../../src/utility/string";

describe("splitMessage", () => {
  const stringLength = getRandomInteger(501, 2048);
  const str = random.alpha({ count: stringLength });

  it("should split a message over 500 characters and less than 1000 into 2", () => {
    const actual = splitMessage(str);

    expect(actual.length).toBe(Math.ceil(str.length / MAX_MESSAGE_LENGTH));
    expect(actual.pop().length).toBe(str.length % MAX_MESSAGE_LENGTH);
  });
});
