import { GuildMember, Message } from 'discord.js';
import sendMessage from '../sendMessage';
import users from '../../database/users';
import isValidChannel from '../utils/isValidChannel';
import log from '../../database/log';

const addUser = {
  name: 'addUser'.toLowerCase(),
  func: async ([userId, phone]: string[], user: GuildMember, msg: Message): Promise<void> => {
    if (!(await isValidChannel(msg.channel.id))) {
      console.error("Requested in invalid channel");

      return;
    }

    if (!user.hasPermission("ADMINISTRATOR")) {
      sendMessage(msg.channel, "You must be a an administrator to add users.");

      return;
    }

    if (!userId || !phone) {
      sendMessage(msg.channel, "There are missing parameters.");
      
      return;
    }

    if (isNaN(phone as unknown as number)) {
      sendMessage(msg.channel, "Invalid phone number");
      
      return;
    }

    msg.channel.startTyping();

    const userToAdd = msg.mentions.members.array()[0].user;
    const phoneNumber = parseInt(phone, 10);

    users.add({ name: userToAdd.id, phone: phoneNumber })
      .then(() => {
        console.log("added")

        return sendMessage(msg.channel, `${userToAdd.toString()} Added`);
      })
      .then(() => msg.channel.stopTyping())
      .then(() => log.userAction(msg.member.id, `Add ${userToAdd.toString()} with phone number: ${phoneNumber}`))
      .catch((err: Error) => {
        console.error(err);
        log.message(err.message);

        return sendMessage(msg.channel, "An error occured");
      })
      .then(() => msg.channel.stopTyping());
  }
};

export default addUser;