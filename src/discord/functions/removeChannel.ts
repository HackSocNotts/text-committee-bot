import { GuildMember, Message, TextChannel } from 'discord.js';
import channels from '../../database/channels';
import sendMessage from '../sendMessage';

const removeChannel = {
  name: 'removeChannel'.toLowerCase(),
  func: ([]: String[], user: GuildMember, msg: Message): void => {
    if (!user.hasPermission("ADMINISTRATOR")) {
      return;
    }

    msg.channel.startTyping();

    const {id} = msg.channel as TextChannel;

    channels.remove(id)
      .then(() => {
        console.log("removed")

        return sendMessage(msg.channel, `${msg.channel.toString()} Removed Succesfully`);
      })
      .then(() => msg.channel.stopTyping())
      .catch((err: Error) => {
        console.error(err)

        return sendMessage(msg.channel, "An error occured");
      })
      .then(() => msg.channel.stopTyping());
  }
};

export default removeChannel;