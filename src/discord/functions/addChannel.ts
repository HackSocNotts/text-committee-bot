import { GuildMember, Message, TextChannel } from 'discord.js';
import channels from '../../database/channels';
import sendMessage from '../sendMessage';
import log from '../../database/log';

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
      .then(() => log.userAction(msg.member.id, `Added: ${msg.channel.toString()}`))
      .catch((err: Error) => {
        console.error(err);
        log.message(err.message);

        return sendMessage(msg.channel, "An error occured");
      })
      .then(() => msg.channel.stopTyping());
  }
};

export default addChannel;