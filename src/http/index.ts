import koa, { Context } from 'koa';
import * as koaBody from 'koa-body';
import * as Router from 'koa-router';
import { Client, Message, TextChannel, RichEmbed } from 'discord.js';
import { PORT, JOB_APPROVAL_CHANNEL_ID } from '../config';
import jobs from '../database/jobs';
import IJob from '../interfaces/IJob';

export default (app: koa<any>, committeeClient: Client, generalClient: Client) => {
  const router = new Router();

  router.post('/job', async (ctx: Context, next: () => void) => {
    const { email, timestamp, payload } = ctx.request.body.response;
    const name = payload.Name;
    const company = payload.Company;
    const jobTitle = payload['Job Title'];
    const description = payload.Description;

    const approvalChannel = committeeClient.channels.get(JOB_APPROVAL_CHANNEL_ID) as TextChannel;
    // const jobChannel: Channel = committeeClient.channels.filter((channel: Channel) => channel.id === JOB_CHANNEL_ID)[0];

    try {
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

      console.log(toAddBody);

      await jobs.add(toAddBody);

      await jobs.get.byApproval(message.id);

      await message.react('👍'); await message.react('👎'); await message.react('🚫');

      ctx.response.status = 200;
      ctx.response.body = 'Recieved';
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
