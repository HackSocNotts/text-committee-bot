import db, { exit as dbExit } from './database/db';
import clients, { exit as discordExit } from './discord/client';
import killCron from './cron';
import * as Koa from 'koa';
import httpConfig from './http';

const app = new Koa();

httpConfig(app, clients[0], clients[1]);

export const die = () => {
  const promises: Promise<any>[] = [];

  if (db) {
    promises.push(dbExit());
  }
  
  for (const client of clients) {
    if (client) {
      promises.push(discordExit());
      break;
    }
  }
      
  Promise.all(promises)
    .then(() => process.exit())
    .catch((err: Error) => {
      console.error(`Failed to quit safely. Foricing exit.\n (${err.name}): ${err.message}\n`, err.stack);
      process.exit();
    });
};

process.on('SIGINT', (): void => {
  console.log("Caught interrupt signal");
  killCron();
  die();
});
