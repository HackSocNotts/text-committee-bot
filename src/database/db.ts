import { verbose } from 'sqlite3';
import { initUsers, initChannels, initLog, initConfig, initMembers, initJobs } from './init';
import { DB_LOCATION } from '../config';

const sqlite3 = verbose();
const db = new sqlite3.Database(`${DB_LOCATION}/committeeBot.db`);

db.serialize(() => {
  let query = initUsers();
  query += initChannels();
  query += initLog();
  query += initConfig();
  query += initMembers();
  query += initJobs();

  db.exec(query, (err: Error) => {
    if (err) {
      console.error("Error intialising database connection: ", `(${err.name})`, err.message, "\n", err.stack);
    } else {
      console.log("Database Intialisised");
    }
  });
});

// db.on("trace", console.log);

export default db;

export const exit = (): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.close((err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}
