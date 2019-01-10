import { Message } from 'discord.js';
import { DISCORD_BOT_COMMAND } from '../../config';
import addChannel from './addChannel';
import removeChannel from './removeChannel';
import sendMessage from '../sendMessage';
import getChannels from './getChannels';

const functionHandler = (msg: Message): void => {
  const rawMessage = msg.content.split(' ');
  const [command, functionName, ...args] = rawMessage;
  const user = msg.member;

  if (command !== DISCORD_BOT_COMMAND) {
    return;
  }

  switch (functionName.toLowerCase()) {
    case addChannel.name:
      addChannel.func(args, user, msg);
      break;

    case removeChannel.name:
      removeChannel.func(args, user, msg);
      break;

    case getChannels.name:
      getChannels.func(args, user, msg);
      break;

    default:
      msg.channel.startTyping();
      sendMessage(msg.channel, "I don't recognise that instruction")
        .then(() => msg.channel.stopTyping())
        .catch(() => msg.channel.stopTyping());
  }
};

export default functionHandler;