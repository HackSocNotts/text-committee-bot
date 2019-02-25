import { Client, Message } from 'discord.js';
import { DISCORD_SMS_BOT_TOKEN, DISCORD_SMS_BOT_COMMAND, DISCORD_GENERAL_BOT_COMMAND, DISCORD_GENERAL_BOT_TOKEN } from '../config';
import handle from './functions/handler';
import { die } from '..';
import presences from './presences';
import generalConfig from '../bots/generalBot';

const configureClient = (client: Client, command: String) => {
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! With command ${command}.`);
  });

  client.on('message', (msg: Message) => {
    if (msg.content.substr(0, command.length) === command && msg.content !== command) {
      handle(msg);
    }
  });

  client.on('disconnect', () => {
    die();
  });

  return client;
}

const smsClient = configureClient(new Client(), DISCORD_SMS_BOT_COMMAND);
const generalClient = configureClient(new Client(), DISCORD_GENERAL_BOT_COMMAND);

generalConfig(generalClient);

smsClient.login(DISCORD_SMS_BOT_TOKEN);
generalClient.login(DISCORD_GENERAL_BOT_TOKEN);

setInterval(() => {
  // tslint:disable-next-line:insecure-random
  const presence = presences[Math.floor(Math.random()*presences.length)];

  smsClient.user.setPresence(presence);
}, 60*1000)

export default smsClient;

export const exit = () => {
  return Promise.all([smsClient.destroy(), generalClient.destroy()]);
}