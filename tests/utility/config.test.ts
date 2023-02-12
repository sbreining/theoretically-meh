import { faker } from '@faker-js/faker';
import { envToBool, envToNum } from '../../src/utility/config';

describe('Configuration Tests', () => {
  describe('envToBool', () => {
    it('should result in true for any case of "true"', () => {
      const word = [['T', 't'], ['R', 'r'], ['U', 'u'], ['E', 'e']]
        .map((letter) => letter[Math.floor(Math.random()*2)])
        .join('');
      const actual = envToBool(word);

      expect(actual).toBe(true);
    });

    it('should return false for any other word', () => {
      const actual = envToBool(faker.word.noun());

      expect(actual).toBe(false);
    });
  });

  describe('envToNum', () => {
    it('should return a number for any value that is a number', () => {
      const expected = faker.datatype.number({ min: 1, max: 100 });
      const actual = envToNum(`${expected}`);

      expect(actual).toBe(expected);
    });

    it('should raise an error if the value is not a number.', () => {
      const failure = faker.word.preposition();

      try {
        envToNum(failure);
        fail('It should not convert a word to a number');
      } catch {
        expect(true).toBe(true);
      }
    });
  });
});
