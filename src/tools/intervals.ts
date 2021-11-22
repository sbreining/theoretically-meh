import { getViewersList } from '@api/twitch';
import { addPointsByName } from '@repositories/viewer';

let runningIntervals: Record<string, number> = {};

/**
 * Will map the ID of the setInterval by the name provided.
 *
 * @param name - The name to store for the interaval.
 * @param callback - The callback function for setInterval.
 * @param milliseconds - Number of milliseconds between callback execution.
 */
export async function createInterval(name: string, callback: CallableFunction, milliseconds: number): Promise<void> {
  if (name in runningIntervals) {
    throw Error('That name already exists');
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

/**
 * Get the list of viewers currently watching the stream, and based
 * on what level viewer they are, add points for them.
 */
export async function distributePointsToViewership(): Promise<void> {
  const groups = await getViewersList();

  if (Object.keys(groups).length == 0) return;

  for (const viewer of groups.broadcaster) {
    addPointsByName(viewer, 9);
  }
  for (const viewer of groups.vips) {
    addPointsByName(viewer, 3);
  }
  for (const viewer of groups.moderators) {
    addPointsByName(viewer, 5);
  }
  for (const viewer of groups.viewers) {
    addPointsByName(viewer, 1);
  }
};
