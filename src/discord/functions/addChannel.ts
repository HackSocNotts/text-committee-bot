import { GuildMember, Message, TextChannel } from 'discord.js';
import channels from '../../database/channels';
import sendMessage from '../sendMessage';

const addChannel = {
  name: 'addChannel'.toLowerCase(),
  func: ([]: String[], user: GuildMember, msg: Message): void => {
    if (!user.hasPermission("ADMINISTRATOR")) {
      return;
    }

    msg.channel.startTyping();

    const {name, id} = msg.channel as TextChannel;

    channels.add({ name, id })
      .then(() => {
        console.log("added")

        return sendMessage(msg.channel, `${msg.channel.toString()} Added`);
      })
      .then(() => msg.channel.stopTyping())
      .catch((err: Error) => {
        console.error(err)

        return sendMessage(msg.channel, "An error occured");
      })
      .then(() => msg.channel.stopTyping());
  }
};

export default addChannel;