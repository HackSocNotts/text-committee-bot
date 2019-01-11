import { GuildMember, Message, RichEmbed } from 'discord.js';
import sendMessage from '../sendMessage';
import log from '../../database/log';

const getLogs = {
  name: 'getLogs'.toLowerCase(),
  func: ([countS]: string[], user: GuildMember, msg: Message): void => {
    if (!user.hasPermission("ADMINISTRATOR")) {
      return;
    }

    if (!countS) {
      sendMessage(msg.channel, "There are missing parameters.");
      
      return;
    }

    msg.channel.startTyping();

    const count = parseInt(countS, 10);

    log.get(count)
      .then((logs: ILog[]) => {
        console.log("Retrieving logs")

        const embed = new RichEmbed()
          .setTitle("Text Committee Bot Logs")
          .setDescription(`${logs.length} most recent entries.`);

        for (const entry of logs) {
          const entryUser = entry.userId ? `${msg.guild.members.get(entry.userId).displayName} | ` : "";
          embed.addField(`${entryUser}${entry.dateTime.toLocaleString()}`, entry.message)
        }

        return sendMessage(msg.channel, embed);
      })
      .then(() => msg.channel.stopTyping())
      .then(() => log.userAction(msg.member.id, `Retrieved ${count} logs.`))
      .catch((err: Error) => {
        console.error(err);
        log.message(err.message);

        return sendMessage(msg.channel, "An error occured");
      })
      .then(() => msg.channel.stopTyping());
  }
};

export default getLogs;