import { GuildMember, Message, RichEmbed } from 'discord.js';
import sendMessage from '../sendMessage';
import users from '../../database/users';
import isValidChannel from '../utils/isValidChannel';
import IUser from '../../interfaces/IUser';

const getUsers = {
  name: 'getUsers'.toLowerCase(),
  func: async ([]: string[], user: GuildMember, msg: Message): Promise<void> => {
    if (!(await isValidChannel(msg.channel.id))) {
      console.error("Requested in invalid channel");

      return;
    }

    if (!user.hasPermission("ADMINISTRATOR")) {
      sendMessage(msg.channel, "You must be a an administrator to add users.");

      return;
    }

    msg.channel.startTyping();

    users.getAll()
      .then((members: IUser[]) => {
        console.log("getting users")

        const embed = new RichEmbed()
          .setTitle("Users")
          .setDescription("Users that are registed with me.");

        for (const member of members) {
          embed.addField(msg.guild.members.get(member.name).displayName, member.phone);
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

export default getUsers;