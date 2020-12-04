import { ChatUserstate, Client } from "tmi.js";
import executeCommand from "./commands";
import { config, convertMinutesToMs, splitMessage } from "./utility";
import connectToDb from "./database";

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
  Will.action(twitch.channel, " is here now, and feeling 'meh'.");

  setInterval(channelBroadcast, convertMinutesToMs(10));
};

const onMessageHandler = (
  channel: string,
  userContext: ChatUserstate,
  message: string,
  self: boolean
): void => {
  // Ignore messages from itself, or those that are not commands.
  if (self || !message.startsWith("!")) return;

  const command = message.trim().slice(1);

  executeCommand(command, userContext)
    .then((message: string) => {
      const messages = splitMessage(message);
      messages.forEach((result) => Will.say(channel, result));
    })
    .catch(() => {
      /* Do nothing for now. */
    });
};

Will.on("connected", onConnectedHandler).on("message", onMessageHandler);

connectToDb().then(() => {
  Will.connect();
});
