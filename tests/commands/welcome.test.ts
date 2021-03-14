import welcome from '@commands/welcome';

describe('welcome', () => {
  it('should return the expected message', () => {
    const actual = welcome.exec();

    expect(actual).toBe(
      "Welcome to KettelBear's den. Please, feel free explore" +
        ' available commands (!commands), or check out the discord' +
        ' (!discord). Find more information below the stream,' +
        ' including schedule, computer specs, follower goals, etc.'
    );
  });
});
