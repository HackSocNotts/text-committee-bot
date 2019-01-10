import { GuildMember, Message, RichEmbed } from 'discord.js';
import dbChannels from '../../database/channels';
import sendMessage from '../sendMessage';
import IChannel from '../../interfaces/IChannel';

const getChannels = {
  name: 'getChannels'.toLowerCase(),
  func: ([]: String[], user: GuildMember, msg: Message): void => {
    if (!user.hasPermission("ADMINISTRATOR")) {
      return;
    }

    msg.channel.startTyping();

    dbChannels.getAll()
      .then((channels: IChannel[]) => {
        console.log("getting channels")

        const embed = new RichEmbed()
          .setTitle("Whitelisted Channles")
          .setDescription("Channels I can be reached on");

        for (const channel of channels) {
          embed.addField(channel.name, msg.guild.channels.get(channel.id).toString());
        }

        return sendMessage(msg.channel, embed);
      })
      .then(() => msg.channel.stopTyping())
      .catch((err: Error) => {
        console.error(err)

        return sendMessage(msg.channel, "An error occured");
      })
      .then(() => msg.channel.stopTyping());
  }
};

export default getChannels;