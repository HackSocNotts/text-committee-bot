import { GuildMember, Message } from 'discord.js';
import configuration from '../../database/configuration';
import sendMessage from '../sendMessage';
import log from '../../database/log';

const setConfig = {
  name: 'setConfig'.toLowerCase(),
  func: ([key, ...valueArray]: string[], user: GuildMember, msg: Message): void => {
    if (!user.hasPermission("ADMINISTRATOR")) {
      return;
    }

    const value = valueArray.join(" ");

    msg.channel.startTyping();

    configuration.getConf(key)
      .then(() => configuration.update(key, value))
      .catch(() => configuration.add(key, value))
      .then(() => {
        console.log("udpated configuration", key, "to", value);

        return sendMessage(msg.channel, `**${key}** has been set to **${value}**`);
      })
      .then(() => msg.channel.stopTyping())
      .then(() => log.userAction(msg.member.id, `Update Config ${key} to ${value}`))
      .catch((err: Error) => {
        console.error(err);
        log.message(err.message);

        return sendMessage(msg.channel, "An error occured");
      })
      .then(() => msg.channel.stopTyping());    
  }
};

export default setConfig;