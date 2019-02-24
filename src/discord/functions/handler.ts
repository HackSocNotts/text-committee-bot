import { Message, GuildMember } from 'discord.js';
import { DISCORD_SMS_BOT_COMMAND, DISCORD_GENERAL_BOT_COMMAND } from '../../config';
import addChannel from './addChannel';
import removeChannel from './removeChannel';
import sendMessage from '../sendMessage';
import getChannels from './getChannels';
import addUser from './addUser';
import removeUser from './removeUser';
import getUsers from './getUsers';
import send from './send';
import getLogs from './getLogs';
import getMembers from './getMembers';

const smsHandler = (functionName: string, args: string[], user: GuildMember, msg: Message) => {
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

    case addUser.name:
      addUser.func(args, user, msg);
      break;

    case removeUser.name:
      removeUser.func(args, user, msg);
      break;

    case getUsers.name:
      getUsers.func(args, user, msg);
      break;

    case send.name:
      send.func(args, user, msg);
      break;

    case getLogs.name:
      getLogs.func(args, user, msg);
      break;

    default:
      msg.channel.startTyping();
      sendMessage(msg.channel, "I don't recognise that instruction")
        .then(() => msg.channel.stopTyping())
        .catch(() => msg.channel.stopTyping());
  }
};

const generalHandler = (functionName: string, args: string[], user: GuildMember, msg: Message) => {
  console.log(args, user.id);
  switch (functionName.toLowerCase()) {    
    case getMembers.name:
      getMembers.func();
      break;

    default:
      msg.channel.startTyping();
      sendMessage(msg.channel, "I don't recognise that instruction")
        .then(() => msg.channel.stopTyping())
        .catch(() => msg.channel.stopTyping());
  }
};

const functionHandler = (msg: Message): void => {
  const rawMessage = msg.content.split(' ');
  const [command, functionName, ...args] = rawMessage;
  const user = msg.member;

  switch (command) {
    case DISCORD_SMS_BOT_COMMAND:
      return smsHandler(functionName, args, user, msg);

    case DISCORD_GENERAL_BOT_COMMAND:
      return generalHandler(functionName, args, user, msg);

    default:
      return;
  }  
};

export default functionHandler;