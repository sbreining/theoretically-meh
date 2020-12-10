let runningIntervals: Record<string, number> = {};

// TODO: Assess whether this is necessary.

/**
 * Will map the ID of the setInterval by the name provided.
 *
 * @param name - The name to store for the interaval.
 * @param callback - The callback function for setInterval.
 * @param milliseconds - Number of milliseconds between callback execution.
 */
export async function createInterval(
  name: string,
  callback: CallableFunction,
  milliseconds: number
): Promise<void> {
  if (name in runningIntervals) {
    throw Error("That name already exists");
  }

  runningIntervals[name] = setInterval(callback, milliseconds);
}

/**
 * Clear the interval by name.
 *
 * @param {string} name - The name given to the interval.
 */
export async function stopInterval(name: string): Promise<void> {
  clearInterval(runningIntervals[name]);
}
