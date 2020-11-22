import { ChatUserstate, Client } from "tmi.js";
import executeCommand from "./commands";
import { config } from "./utility";
import { convertMinutesToMs } from "./utility/time";

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

const repeatMessage = () => {
  Will.say(
    twitch.channel,
    "Welcome to KettelBear's den. Please, feel free explore available commands (!commands), or check out the discord (!discord)."
  );
};

const onConnectedHandler = (address: string, port: number) => {
  console.log(`* Connected to ${address}:${port}`);
  Will.action(twitch.channel, " is here now, and feeling 'meh'.");

  setInterval(repeatMessage, convertMinutesToMs(5));
};

const onMessageHandler = (
  channel: string,
  userContext: ChatUserstate,
  message: string,
  self: boolean
) => {
  // Ignore messages from itself.
  if (self || !message.startsWith("!")) return;

  const command = message.trim().slice(1);

  executeCommand(command, userContext)
    .then((results: Array<string>) => {
      results.forEach((result) => Will.say(channel, result));
    })
    .catch(() => {
      /* Do Nothing */
    });
};

Will.on("connected", onConnectedHandler);
Will.on("message", onMessageHandler);

Will.connect();
