const START = 0;
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
  let messages = [];

  while (message.length > MAX_MESSAGE_LENGTH) {
    messages.push(message.substr(START, MAX_MESSAGE_LENGTH));

    message = message.slice(MAX_MESSAGE_LENGTH);
  }

  messages.push(message);

  return messages;
}
