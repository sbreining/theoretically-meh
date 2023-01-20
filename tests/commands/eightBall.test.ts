import { random } from 'faker';
import eight from '../../src/commands/eightBall';
import { getRandomInteger } from '../../src/utility';

const getQuestionWord = (): string => {
  return eight.questionWords[getRandomInteger(0, eight.questionWords.length - 1)]
}

const buildQuestion = (hasWord = true, hasMark = true): string => {
  const word = hasWord ? getQuestionWord() : '';
  const mark = hasMark ? '?' : '';

  return `8ball ${word} ${random.words(5)}${mark}`;
}

describe('8ball', () => {
  describe('Bad usage', () => {
    it('should not answer without a question mark', () => {
      const question = buildQuestion(true, false);

      expect(eight.exec(question)).toStrictEqual(eight.badUsage);
    });

    it('should not answer without a question word at the start', () => {
      const question = buildQuestion(false);

      expect(eight.exec(question)).toStrictEqual(eight.badUsage);
    });
  });

  describe('Good usage', () => {
    it('should answer with one of the many 8ball phrases', () => {
      const question = buildQuestion();
      const answer = eight.exec(question).split('"')[1];

      expect(eight.answers).toContain(answer);
    });

    it('should preceed the answer with "8ball says; "', () => {
      const question = buildQuestion();
      const answer = eight.exec(question);

      expect(answer).toMatch(/^8ball says; /);
    });
  });
});
