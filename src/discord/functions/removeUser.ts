import { GuildMember, Message } from 'discord.js';
import sendMessage from '../sendMessage';
import users from '../../database/users';
import isValidChannel from '../utils/isValidChannel';

const removeUser = {
  name: 'removeUser'.toLowerCase(),
  func: async ([userId]: string[], user: GuildMember, msg: Message): Promise<void> => {
    if (!(await isValidChannel(msg.channel.id))) {
      console.error("Requested in invalid channel");

      return;
    }

    if (!user.hasPermission("ADMINISTRATOR") && msg.mentions.users.array()[0].id !== msg.member.id) {
      sendMessage(msg.channel, "You must be a an administrator to remove users.");
      
      return;
    }

    if (!userId) {
      sendMessage(msg.channel, "There are missing parameters.");
      
      return;
    }

    msg.channel.startTyping();

    const userToRemove = msg.mentions.members.array()[0].user;

    users.delete.byName(userToRemove.id)
      .then(() => {
        console.log("added")

        return sendMessage(msg.channel, `${userToRemove.toString()} Removed`);
      })
      .then(() => msg.channel.stopTyping())
      .catch((err: Error) => {
        console.error(err)

        return sendMessage(msg.channel, "An error occured");
      })
      .then(() => msg.channel.stopTyping());
  }
};

export default removeUser;