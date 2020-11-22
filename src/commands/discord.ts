import { config } from "../utility";

export const COMMAND_DISCORD = "discord";

const { links } = config;

/**
 * Returns a simple message with the discord link.
 *
 * @return {string} - The message including the discord link.
 */
export default function discord(): string {
  return `All are welcome to join the den. Find your way in: ${links.discord}`;
}
