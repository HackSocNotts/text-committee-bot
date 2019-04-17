import koa, { Context } from 'koa';
import * as koaBody from 'koa-body';
import * as Router from 'koa-router';
import { Client } from 'discord.js';
import { PORT } from '../config';
import IJob from '../interfaces/IJob';
import handleHook from '../jobs/handleHook';


// tslint:disable-next-line:no-any
export default (app: koa<any>, committeeClient: Client, generalClient: Client) => {
  const router = new Router();

  router.post('/job', async (ctx: Context) => {
    const { email, timestamp, payload } = ctx.request.body.response;

    const job: IJob = {
      name: payload.Name as string,
      company: payload.Company as string,
      title: payload['Job Title'] as string,
      description: payload.Description as string,
      email: email as string,
      approvalMessage: '',
    };

    await handleHook(ctx, job, timestamp, committeeClient, generalClient);
  });

  app
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(PORT);
};
