import cmd from './manageCmds';
import dice from './dice';
import discord from './discord';
import eight from './eightBall';
import howTo from './howTo';
import points from './points';
import title from './title';
import welcome from './welcome';

const userCommands = [
  'commands',
  dice.command,
  discord.command,
  eight.command,
  howTo.command,
  points.command,
  title.command,
  welcome.command,
];

export default {
  // !commands will trigger this, which will list available user commands.
  commands: {
    exec: () => `Available commands are: ${userCommands.join(', ')}`,
  },

  // User Commands
  [dice.command]: dice,
  [discord.command]: discord,
  [eight.command]: eight,
  [howTo.command]: howTo,
  [points.command]: points,
  [welcome.command]: welcome,

  // Both (Mods have extra functionality)
  [title.command]: title,

  // Mod Commands
  addcom: cmd,
  delcom: cmd,
};
