import { faker } from '@faker-js/faker';
import eight from '../../../src/command/commands/eightBall';
import Utility from '../../../src/utility';

const getQuestionWord = (): string => {
  return eight.questionWords[Utility.Number.getRandomInteger(0, eight.questionWords.length - 1)]
}

const buildQuestion = (hasWord = true, hasMark = true): string => {
  const word = hasWord ? getQuestionWord() : '';
  const mark = hasMark ? '?' : '';

  return `8ball ${word} ${faker.random.words(5)}${mark}`;
}

describe('8ball', () => {
  describe('Bad usage', () => {
    it('should not answer without a question mark', () => {
      const question = buildQuestion(true, false);

      expect(eight.exec({ command: question })).toStrictEqual(eight.badUsage);
    });

    it('should not answer without a question word at the start', () => {
      const question = buildQuestion(false);

      expect(eight.exec({ command: question })).toStrictEqual(eight.badUsage);
    });
  });

  describe('Good usage', () => {
    it('should answer with one of the many 8ball phrases', () => {
      const question = buildQuestion();
      const answer = eight.exec({ command: question }).split('"')[1];

      expect(eight.answers).toContain(answer);
    });

    it('should preceed the answer with "8ball says; "', () => {
      const question = buildQuestion();
      const answer = eight.exec({ command: question });

      expect(answer).toMatch(/^8ball says; /);
    });
  });
});
