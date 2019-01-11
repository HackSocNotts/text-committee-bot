import { Client, Message } from 'discord.js';
import { DISCORD_BOT_TOKEN, DISCORD_BOT_COMMAND } from '../config';
import handle from './functions/handler';
import { die } from '..';
import presences from './presences';

const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg: Message) => {
  if (msg.content.substr(0, DISCORD_BOT_COMMAND.length) === DISCORD_BOT_COMMAND) {
    handle(msg);
  }
});

client.on('disconnect', () => {
  die();
});

client.login(DISCORD_BOT_TOKEN);

setInterval(() => {
  // tslint:disable-next-line:insecure-random
  const presence = presences[Math.floor(Math.random()*presences.length)];

  client.user.setPresence(presence);
}, 60*1000)

export default client;

export const exit = (): Promise<void> => {
  return client.destroy();
}