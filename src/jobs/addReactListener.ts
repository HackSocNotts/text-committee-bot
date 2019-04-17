import { Message, Client, Collection, MessageReaction, RichEmbed, CollectorFilter, User } from "discord.js";
import IJob from '../interfaces/IJob';
import jobs from '../database/jobs';
import postJob from './postJob';

const addReactListener = async (message: Message, client: Client, job: IJob, embed: RichEmbed) => {
  const filter: CollectorFilter = (reaction: MessageReaction, user: User) => {
    return ['👍', '👎', '🚫'].includes(reaction.emoji.name) && user.id !== message.author.id;
  };

  message.awaitReactions(filter, { max: 1 })
    .then(async (collected: Collection<string, MessageReaction>) => {
      const reaction = collected.first();
      await message.clearReactions();
      embed.description = undefined;

      switch (reaction.emoji.name) {
        case '👍':
          embed.title = 'Approved Job Posting';
          await message.edit(embed);

          return jobs.approve(message.id, (await postJob(job, client)).id);
        
        case'👎':
          embed.title = 'Rejected Job Posting';
          await message.edit(embed);

          return jobs.reject(message.id);
        
        case'🚫':
          embed.title = 'Rejected and Baned Job Posting';
          await message.edit(embed);

          return jobs.reject(message.id)
            .then(() => jobs.ban.add(job.email));

        default:
          return Promise.reject('Invalid reaction');
      }
    })
    .catch(console.error);
}

export default addReactListener;