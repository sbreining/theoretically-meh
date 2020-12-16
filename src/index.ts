import { ChatUserstate, Client } from "tmi.js";
import execute from "@commands";
import { config, convertMinutesToMs, splitMessage } from "@utility";
import connect from "@database";
import { createInterval } from "./tools/intervals";
import getViewersList from "./api/twitch";
import { addPointsByName } from "@repositories/viewer";

const { twitch } = config;

const options = {
  channels: [twitch.channel],
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: twitch.username,
    password: twitch.password,
  },
};

// I miss you, Will. Hopefully you're resting well big guy.
const Will = Client(options);

const broadcastMessage =
  "Welcome to KettelBear's den. Please, feel free explore" +
  " available commands (!commands), or check out the discord" +
  " (!discord). Find more information below the stream," +
  " including schedule, computer specs, follower goals, etc.";

const channelBroadcast = () => Will.say(twitch.channel, broadcastMessage);

const onConnectedHandler = (address: string, port: number): void => {
  console.log(`* Connected to ${address}:${port}`);
  Will.action(twitch.channel, ' is here now, and feeling "meh".');

  setInterval(channelBroadcast, convertMinutesToMs(10));
};

const onMessageHandler = async (
  channel: string,
  userContext: ChatUserstate,
  message: string,
  self: boolean
): Promise<void> => {
  // Ignore messages from itself, or those that are not commands.
  if (self || !message.startsWith("!")) return;

  const command = message.trim().slice(1);

  const response = await execute(command, userContext);

  // Return early from invalid command.
  if (!response) return;

  splitMessage(response).forEach((msg) => Will.say(channel, msg));
};

Will.on("connected", onConnectedHandler).on("message", onMessageHandler);

/**
 * TODO: Move this.
 */
const getViewers = async () => {
  const groups = await getViewersList();
  for (const viewer of groups.broadcaster) {
    addPointsByName(viewer, 20);
  }
  for (const viewer of groups.vips) {
    addPointsByName(viewer, 5);
  }
  for (const viewer of groups.moderators) {
    addPointsByName(viewer, 7);
  }
  for (const viewer of groups.viewers) {
    addPointsByName(viewer, 3);
  }
};
createInterval("viewer-points", getViewers, convertMinutesToMs(0.5));
/**
 * End of "Move this."
 */

connect().then(() => {
  Will.connect();
});
