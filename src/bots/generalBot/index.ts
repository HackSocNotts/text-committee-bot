import { Client, GuildMember } from 'discord.js';
import configuration from '../../database/configuration';

export default (client: Client) => {
  client.on('guildMemberAdd', async (member: GuildMember) => {
    console.log(member.displayName, "joined");
    member.send(await configuration.getConf('welcome_message'))
      .catch(err => console.error("failed to send welcome message", err));
  });
};
