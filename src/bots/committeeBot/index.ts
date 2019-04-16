import { Client } from 'discord.js';
import presences from '../../discord/presences';

export default (client: Client) => {
  setInterval(() => {
    // tslint:disable-next-line:insecure-random
    const presence = presences[Math.floor(Math.random()*presences.length)];
  
    client.user.setPresence(presence);
  }, 60*1000)
};
