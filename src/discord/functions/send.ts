import { GuildMember, Message } from 'discord.js';
import sendMessage from '../sendMessage';
import isValidChannel from '../utils/isValidChannel';
import sendSMS from '../../nexmo/sendMessage';
import users from '../../database/users';
import NotFoundError from '../../errors/NotFoundError';

const send = {
  name: 'send'.toLowerCase(),
  func: async (message: string[], user: GuildMember, msg: Message): Promise<void> => {
    if (!(await isValidChannel(msg.channel.id))) {
      console.error("Requested in invalid channel");

      return;
    }

    if (!message) {
      sendMessage(msg.channel, "There are missing parameters.");
      
      return;
    }

    msg.channel.startTyping();

    const messageToSend = `Message from ${user.displayName}:\n${message.join(" ")}`;

    try {
      const recipients = await users.getAll();

      for (const recipient of recipients) {
        sendSMS(recipient.phone, messageToSend);
      }
    } catch (err) {
      if (err instanceof NotFoundError) {
        return sendMessage(msg.channel, "There aren't any users to send a message to.")
        .then(() => msg.channel.stopTyping())
        .catch((err2: Error) => {
          console.error(err2);
          msg.channel.stopTyping();
        })
      }

      console.error(err);

      return sendMessage(msg.channel, "An error occured")
        .then(() => msg.channel.stopTyping())
        .catch((err2: Error) => {
          console.error(err2);
          msg.channel.stopTyping();
        })
    }

    return sendMessage(msg.channel, `Message sent to all users`)
      .then(() => msg.channel.stopTyping())
      .catch((err: Error) => {
        console.error(err)

        return sendMessage(msg.channel, "An error occured");
      })
      .then(() => msg.channel.stopTyping());
  }
};

export default send;