import { ChatUserstate, Client } from "tmi.js";
import execute from "@commands";
import { config, convertMinutesToMs, splitMessage } from "@utility";
import connect from "@database";
import "./tools/intervals";

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

// I miss you, Will. Hopefully you're resting well big guy. Yes, that is a fat joke.
const Will = Client(options);

const onConnectedHandler = (address: string, port: number): void => {
  console.log(`* Connected to ${address}:${port}`);
  Will.action(twitch.channel, ' is here now, and feeling "meh".');
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

connect().then(() => {
  Will.connect();
});
