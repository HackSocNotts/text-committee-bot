import db from './db';
import { RunResult } from 'sqlite3';

export const logUserAction = (userId: string, message: string): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    const now = Math.round(Date.now().valueOf() / 1000);

    db.run("INSERT INTO log (userId, message, timestamp) VALUES (?, ?, ?);", [userId, message, now], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

export const logMessage = (message: string): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    const now = Math.round(Date.now().valueOf() / 1000);

    db.run("INSERT INTO log (message, timestamp) VALUES (?, ?);", [message, now], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

export const getLogs = (count: number): Promise<ILog[]> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.all("SELECT * FROM log ORDER BY timestamp DESC LIMIT ?;", [count], (err: Error, logs: ILog[]) => {
      if (err) {
        return reject(err);
      }

      return resolve(logs.map((entry: ILog) => ({
          ...entry,
          dateTime: new Date(parseInt(entry.timestamp, 10) * 1000),
        })
      ) as ILog[]);
    });
  });
};

export default {
  userAction: logUserAction,
  message: logMessage,
  get: getLogs,
};
