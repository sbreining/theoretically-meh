import Twitch from '../api/twitch';
import { addPointsByName } from '../database/repositories/viewer';

/**
 * Get the list of viewers currently watching the stream, and based
 * on what level viewer they are, add points for them.
 */
export async function distributePointsToViewership(): Promise<void> {
  const groups = await Twitch.User.getViewersList();

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
