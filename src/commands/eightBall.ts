import Utility from '../utility';
import Command from './command';

class EightBall implements Command {
  public readonly command = '8ball';

  public readonly instruction =
    'Start with !8ball, the follow it with a question that includes a' +
    ' question word and ends with a "?"';

  public readonly questionWords =
    ['are', 'am', 'will', 'is', 'did', 'do', 'does', 'can'];

  public readonly badUsage =
    '8ball only answers questions, make sure to include a question word' +
    ` (${this.questionWords.join(", ")}) at the beginning and a "?" at the` +
    ' end!';

  public readonly answers: String[] = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later,',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concetrate and ask again.',
    'Do not count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.',
  ];

  private regex =
    new RegExp(`^(8ball )((${this.questionWords.join("|")}) .+\\?)$`, "i");

  /**
   * When posing a question to the Magic 8-ball, it will return with one of
   * its many remarks.
   *
   * @param {string} question - The whole command with the preceeding `!8ball `
   * @returns {string} - The answer to the question asked, or if asked
   *                     incorrectly a usage message.
   */
  public exec(question: string): string {
    if (!this.regex.test(question)) return this.badUsage;

    const answer = this.answers[Utility.Number.getRandomInteger(0, 19)];

    return `8ball says; "${answer}"`;
  }
}

export default new EightBall();