import { config } from "dotenv";
import { ChatUserstate, Client } from "tmi.js";
import executeCommand from "./commands";

config();

const options = {
  channels: [process.env.CHANNEL],
  // connection: {
  //     secure: true,
  //     reconnect: true,
  // },
  identity: {
    username: process.env.USERNAME,
    password: process.env.TOKEN,
  },
};

// I miss you, Will. Hopefully you're resting well big guy.
const Will = Client(options);

const onConnectedHandler = (address: string, port: number) => {
  console.log(`* Connected to ${address}:${port}`);
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
    .then((results: Array<string>) =>
      results.forEach((result) => Will.say(channel, result))
    )
    .catch(() => {
      /* Do Nothing */
    });
};

Will.on("connected", onConnectedHandler);
Will.on("message", onMessageHandler);

Will.connect();
