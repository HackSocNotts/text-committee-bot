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

export default {
  userAction: logUserAction,
  message: logMessage,
};
