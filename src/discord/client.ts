import { Client, Message } from 'discord.js';
import { DISCORD_BOT_TOKEN } from '../config';

const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg: Message) => {
  console.log(msg.content);
});

client.login(DISCORD_BOT_TOKEN);

export default client;

export const exit = (): Promise<void> => {
  return client.destroy();
}