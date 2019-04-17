import { GuildMember, Message, TextChannel } from 'discord.js';
import sendMessage from '../sendMessage';
import isValidChannel from '../utils/isValidChannel';
import NotFoundError from '../../errors/NotFoundError';
import log from '../../database/log';
import discordClients from '../client';

const postMessage = {
  name: 'message'.toLowerCase(),
  func: async ([channel, ...message]: string[], user: GuildMember, msg: Message): Promise<void> => {
    if (!(await isValidChannel(msg.channel.id))) {
      console.error("Requested in invalid channel");

      return;
    }

    if (!message || !channel) {
      sendMessage(msg.channel, "There are missing parameters.");
      
      return;
    }
    const client = discordClients[1];

    const channelToPost = client.channels.get(msg.mentions.channels.first().id) as TextChannel;

    msg.channel.startTyping();

    try {
      await sendMessage(channelToPost, message.join(' '));
      
      return sendMessage(msg.channel, `Message posted in ${channelToPost}`)
        .then(() => msg.channel.stopTyping())
        .then(() => log.userAction(msg.member.id, `Sent:\n ${message.join(' ')}\nin ${channel}.`))
        .catch((err: Error) => {
          console.error(err)
          log.message(err.message);

          return sendMessage(msg.channel, "An error occured");
        })
        .then(() => msg.channel.stopTyping());

    } catch (err) {
      if (err instanceof NotFoundError) {
        return sendMessage(msg.channel, "There aren't any users to send a message to.")
          .then(() => msg.channel.stopTyping())
          .catch((err2: Error) => {
            console.error(err2);
            log.message(err2.message);

            msg.channel.stopTyping();
          });
      }

      console.error(err);
      log.message(err.message);

      return sendMessage(msg.channel, "An error occured")
        .then(() => msg.channel.stopTyping())
        .catch((err2: Error) => {
          console.error(err2);
          log.message(err2.message);
          msg.channel.stopTyping();
        });
    }
  }
};

export default postMessage;