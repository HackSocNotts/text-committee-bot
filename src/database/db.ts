import { verbose } from 'sqlite3';
import { initUsers, initChannels } from './init';

const sqlite3 = verbose();
const db = new sqlite3.Database('/usr/app/database/committeeBot.db');

db.serialize(() => {
  let query = initUsers();
  query += initChannels();

  db.exec(query, (err: Error) => {
    if (err) {
      console.error("Error intialising database connection: ", `(${err.name})`, err.message, "\n", err.stack);
    } else {
      console.log("Database Intialisised");
    }
  });
});

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
