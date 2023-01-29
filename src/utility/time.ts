const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_SECOND = 1000;

/**
 * Converts a given number of minutes into the equivalent time
 * in milliseconds.
 *
 * @param {number} minutes - Number of minutes to be converted.
 * @return {number} - The number of milliseconds in `minutes`.
 */
export function convertMinutesToMs(minutes: number): number {
  return minutes * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
}

export function addSecondsToDate(date: Date, seconds: number): Date {
  return new Date(date.getTime() + seconds * 1000);
}
