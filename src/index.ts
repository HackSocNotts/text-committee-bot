import db, { exit as dbExit } from './database/db';
import client, { exit as discordExit } from './discord/client';

export const die = () => {
  const promises: Promise<any>[] = [];

  if (db) {
    promises.push(dbExit());
  }
  
  if (client) {
    promises.push(discordExit());
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

  die();
});
