import db from './db';
import { RunResult } from 'sqlite3';

export const addConfig = (key: string, value: string | number): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    const now = Math.round(Date.now().valueOf() / 1000);

    db.run("INSERT INTO config (key, value, lastUpdated) VALUES (?, ?, ?);", [key, value, now], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

export const updateConfig = (key: string, value: string | number): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    const now = Math.round(Date.now().valueOf() / 1000);

    db.run("UPDATE config (value, lastUpdated) VALUES (?, ?) WHERE key = ?;", [value, now, key], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

export const deleteConfig = (key: string): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {

    db.run("DELETE FROM config WHERE key = ?;", [key], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

export const getConfig = (key: string): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {

    db.run("SELECT key, value FROM config WHERE key = ?;", [key], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

export const getAllConfigs = (): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {

    db.run("SELECT key, value FROM config;", [], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};


export default {
  get: getConfig,
  getAll: getAllConfigs,
  add: addConfig,
  update: updateConfig,
  delete: deleteConfig
};
