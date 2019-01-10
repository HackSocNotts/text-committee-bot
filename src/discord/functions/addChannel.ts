import { GuildMember, Message, GuildChannel } from 'discord.js';
import channels from '../../database/channels';

const addChannel = {
  name: 'addChannel'.toLowerCase(),
  func: ([]: String[], user: GuildMember, msg: Message): void => {
    if (!user.hasPermission("ADMINISTRATOR")) {
      return;
    }

    const {name, id} = msg.channel as GuildChannel;

    channels.add({ name, id })
      .then(() => console.log("added"))
      .catch((err: Error) => console.error(err));
  }
};

export default addChannel;