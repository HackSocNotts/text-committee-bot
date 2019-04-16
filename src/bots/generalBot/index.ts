import { Client, GuildMember, Message, DMChannel } from 'discord.js';
import configuration from '../../database/configuration';
import handleDM from '../../discord/functions/handleDM';

export default (client: Client) => {
  client.on('guildMemberAdd', async (member: GuildMember) => {
    console.log(member.displayName, "joined");
    member.send(await configuration.getConf('welcome_message'))
      .catch(err => console.error("failed to send welcome message", err));
  });

  client.on('message', (msg: Message) => {
    if (msg.client.user.id === msg.author.id) {
      return;
    }
    // Check for DM
    if (msg.channel instanceof DMChannel) {
      console.log("Recieved DM");
      handleDM(msg)
        .catch((err: Error) => console.error(err));
    }
  });
};
