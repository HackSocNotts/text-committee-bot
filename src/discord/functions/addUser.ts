import { GuildMember, Message } from 'discord.js';
import sendMessage from '../sendMessage';
import users from '../../database/users';
import { isNumber } from 'util';
import isValidChannel from '../utils/isValidChannel';

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

    if (!isNumber(phone)) {
      sendMessage(msg.channel, "Invalid phone number");
      
      return;
    }

    msg.channel.startTyping();

    console.log(userId, msg.mentions.members.array()[0].user);

    const userToAdd = msg.mentions.members.array()[0].user;
    const phoneNumber = parseInt(phone, 10);

    users.add({ name: userToAdd.id, phone: phoneNumber })
      .then(() => {
        console.log("added")

        return sendMessage(msg.channel, `${userToAdd.toString()} Added`);
      })
      .then(() => msg.channel.stopTyping())
      .catch((err: Error) => {
        console.error(err)

        return sendMessage(msg.channel, "An error occured");
      })
      .then(() => msg.channel.stopTyping());
  }
};

export default addUser;