import db from './db';
import IChannel from '../interfaces/IChannel';
import { RunResult } from 'sqlite3';

export const addChannel = (channel: IChannel): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.run("INSERT INTO users [(name, id)] VALUES (?, ?)", [channel.name, channel.id], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

export default {
  add: addChannel
}