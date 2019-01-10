import db from './db';
import IChannel from '../interfaces/IChannel';
import { RunResult } from 'sqlite3';

export const addChannel = (channel: IChannel): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.run("INSERT INTO channels (name, id) VALUES (?, ?)", [channel.name, channel.id], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

export const removeChannel = (id: String): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.run("DELETE FROM channels WHERE id=?", [id], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

export const getAllChannels = (): Promise<IChannel[]> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.all("SELECT * FROM channels", (err: Error, rows: IChannel[]) => {
      if (err) {
        return reject(err);
      }

      return resolve(rows);
    });
  });
};

export default {
  add: addChannel,
  remove: removeChannel,
  getAll: getAllChannels,
}