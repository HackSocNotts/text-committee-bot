import { Context } from "koa";
import jobs from '../database/jobs';

const checkBanned = async (ctx: Context, email: string) => {
  if (await jobs.ban.search(email)) {
    ctx.response.status = 403; ctx.response.message = "Banned";

    return true;
  }

  return false;
}

export default checkBanned;