import discord from "../../src/commands/discord";

describe("discord", () => {
  it("should return the expected message", () => {
    const actual = discord();

    expect(actual).toContain(
      "All are welcome to join the den. Find your way in: "
    );
  });
});
