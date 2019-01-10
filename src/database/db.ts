import { verbose, RunResult } from 'sqlite3';

const sqlite3 = verbose();
const db = new sqlite3.Database('/usr/app/database/committeeBot.db');

db.serialize(() => {
  let query = 'CREATE TABLE IF NOT EXISTS users (';
  query += 'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,';
  query += 'name TEXT NOT NULL,';
  query += 'phone INT UNIQUE NOT NULL);';
  db.run(query, (_: RunResult, err: Error) => {
    if (err) {
      console.error("Error intialising database connection: ", `(${err.name})`, err.message, "\n", err.stack);
    } else {
      console.log("Database Intialisised");
    }
  });
});

export default db;

export const exit = (): void => {
  db.close();
}