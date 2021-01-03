export const MAX_MESSAGE_LENGTH = 500;

/**
 * Twitch.tv has a character limit for messages that stops at
 * 512 characters but that does not include \r\n. That being
 * said, the max number of characters that a user can send
 * is 510. To be cautious this function splits at the constant
 * of MAX_MESSAGE_LENGTH (500), to give a little buffer.
 *
 * @param {string} message - The string to be split.
 */
export function splitMessage(message: string): Array<string> {
  const regex = new RegExp(`.{1,${MAX_MESSAGE_LENGTH}}`, "g");

  return message.match(regex);
}
