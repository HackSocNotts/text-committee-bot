import { GuildMember, Message } from 'discord.js';
import sendMessage from '../sendMessage';
import users from '../../database/users';
import { isNumber } from 'util';

const addUser = {
  name: 'addUser'.toLowerCase(),
  func: ([userId, phone]: string[], user: GuildMember, msg: Message): void => {
    if (!user.hasPermission("ADMINISTRATOR")) {
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