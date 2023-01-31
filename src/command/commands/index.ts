import dice from './dice';
import discord from './discord';
import eight from './eightBall';
import howTo from './howTo';
import points from './points';
import title from './title';
import welcome from './welcome';

export default {
  available: [
    dice.command,
    discord.command,
    eight.command,
    howTo.command,
    points.command,
    title.command,
    welcome.command,
  ],
  [dice.command]: dice,
  [discord.command]: discord,
  [eight.command]: eight,
  [howTo.command]: howTo,
  [points.command]: points,
  [title.command]: title,
  [welcome.command]: welcome,
};
