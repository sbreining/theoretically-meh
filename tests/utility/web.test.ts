import { buildUrlParams } from "../../src/utility/web";

describe('buildUrlParams', () => {
  it('should format a set of key-value pairs into url query params', () => {
    const params = {
      someKey: 'someValue',
      anotherKey: 4,
      thirdKey: true,
    };

    const expected = 'someKey=someValue&anotherKey=4&thirdKey=true';
    const actual = buildUrlParams(params);

    expect(actual).toBe(expected);
  });
});
