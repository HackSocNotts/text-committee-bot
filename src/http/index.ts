import koa, { Context } from 'koa';
import * as koaBody from 'koa-body';
import * as Router from 'koa-router';
import { Client, Message, TextChannel, RichEmbed, CollectorFilter, User, MessageReaction, Collection } from 'discord.js';
import { PORT, JOB_APPROVAL_CHANNEL_ID, JOB_CHANNEL_ID } from '../config';
import jobs from '../database/jobs';
import IJob from '../interfaces/IJob';

const postJob = async (job: IJob, client: Client): Promise<Message> => {
  const channel = client.channels.get(JOB_CHANNEL_ID) as TextChannel;

  try {
    const submitterString = (job.company) ? (job.title) ? ` | ${job.title} at ${job.company}` : ` from ${job.company}` : '';

    const embed = new RichEmbed({
      title: `Job Posting by ${job.name}${submitterString}`,
      description: job.description,
      footer: {
        text: `Contact ${job.name} at ${job.email} to inquire further.`,
      },
    });

    return channel.send(embed) as Promise<Message>;
  } catch (err) {
    throw new Error(err);
  }
}

export default (app: koa<any>, committeeClient: Client, generalClient: Client) => {
  const router = new Router();

  router.post('/job', async (ctx: Context, next: () => void) => {
    const { email, timestamp, payload } = ctx.request.body.response;
    const name = payload.Name;
    const company = payload.Company;
    const jobTitle = payload['Job Title'];
    const description = payload.Description;

    const approvalChannel = committeeClient.channels.get(JOB_APPROVAL_CHANNEL_ID) as TextChannel;

    try {
      if (await jobs.ban.search(email)) {
        ctx.response.status = 403; ctx.response.message = "Banned";

        return;
      }

      const embed = new RichEmbed({
        title: `New Job Posting`,
        description: "Select 👍 to approve the job listing, 👎 to deny it, or 🚫 to block the submitter.",
        footer: {
          text: `${email} | ${timestamp}`,
        },
      });

      const submitterString = (company) ? (jobTitle) ? `\n${jobTitle} at ${company}` : `\nFrom ${company}` : '';

      embed.addField("Submitter", `${name}${submitterString}`);
      embed.addField("Job Description", description);

      const message = (await approvalChannel.send(embed)) as Message;

      const toAddBody: IJob = {
        name,
        company,
        title: jobTitle,
        description,
        email,
        approvalMessage: message.id,
      };

      await jobs.add(toAddBody);

      await jobs.get.byApproval(message.id);

      await message.react('👍'); await message.react('👎'); await message.react('🚫');

      ctx.response.status = 200;
      ctx.response.body = 'Recieved';

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

              return jobs.approve(message.id, (await postJob(toAddBody, generalClient)).id);
            
            case'👎':
              embed.title = 'Rejected Job Posting';
              await message.edit(embed);

              return jobs.reject(message.id);
            
            case'🚫':
              embed.title = 'Rejected and Baned Job Posting';
              await message.edit(embed);

              return jobs.reject(message.id)
                .then(() => jobs.ban.add(email));

            default:
              return Promise.reject('Invalid reaction');
          }
        })
        .catch(console.error);
    } catch (err) {
      console.error(err);
      ctx.response.status = 500;
    }
  });

  app
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(PORT);
};
