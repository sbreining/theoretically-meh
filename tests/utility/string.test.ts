import { faker } from '@faker-js/faker';
import { getRandomInteger, splitMessage } from '../../src/utility';
import { MAX_MESSAGE_LENGTH } from '../../src/utility/string';

describe('splitMessage', () => {
  const stringLength = getRandomInteger(501, 2048);
  const str = faker.random.alpha({ count: stringLength });

  it('should split a message over 500 characters and less than 2049 into multiple sections', () => {
    const actual = splitMessage(str);

    expect(actual.length).toBe(Math.ceil(str.length / MAX_MESSAGE_LENGTH));

    let last = actual.pop();
    if (last) {
      expect(last.length).toBe(str.length % MAX_MESSAGE_LENGTH);
    } else {
      fail('Something is wrong, pop should have returned a value.');
    }
  });
});
