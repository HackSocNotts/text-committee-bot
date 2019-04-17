import { Context } from 'koa';
import IJob from '../interfaces/IJob';
import jobs from '../database/jobs';
import checkBanned from './checkBanned';
import requestApproval from './requestApproval';
import { Client } from 'discord.js';
import addReactListener from './addReactListener';

const handleHook = async (ctx: Context, job: IJob, timestamp: string, committeeClient: Client, generalClient: Client) => {
  try {
    if (await checkBanned(ctx, job.email)) {
      return;
    }

    const [message, embed] = await requestApproval(committeeClient, job, timestamp);
    job.approvalMessage = message.id;

    await jobs.add(job);

    ctx.response.status = 200;
    ctx.response.body = 'Recieved';

    addReactListener(message, generalClient, job, embed);
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
  }
};

export default handleHook;
