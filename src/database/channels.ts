import db from './db';
import IChannel from '../interfaces/IChannel';
import { RunResult } from 'sqlite3';
import NotFoundError from '../errors/NotFoundError';

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

export const getChannel = (channel: string): Promise<IChannel[]> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.get("SELECT * FROM channels WHERE id=?;", [channel], (err: Error, row: IChannel) => {
      if (err) {
        return reject(err);
      }

      if (!row) {
        return reject(new NotFoundError("No channel exists with that name"));
      }

      return resolve(row);
    });
  });
};

export default {
  add: addChannel,
  remove: removeChannel,
  getAll: getAllChannels,
  get: getChannel,
};