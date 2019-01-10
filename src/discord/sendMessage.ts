import { TextChannel, DMChannel, GroupDMChannel, Message, RichEmbed, Attachment } from 'discord.js';

export default (channel: TextChannel | DMChannel | GroupDMChannel, message: String | RichEmbed | Attachment): Promise<Message> => {
  return new Promise((resolve: Function) => {
    setTimeout(resolve, 600);
  })
    .then(() => channel.send(message) as Promise<Message>);
};
