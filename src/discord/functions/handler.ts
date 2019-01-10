import { Message } from 'discord.js';
import { DISCORD_BOT_COMMAND } from '../../config';
import addChannel from './addChannel';

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

    default:
      return;
  }
};

export default functionHandler;