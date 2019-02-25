import db from './db';
import { RunResult } from 'sqlite3';
import IConfig from '../interfaces/IConfig';
import IConfigs from '../interfaces/IConfigs';
import NotFoundError from '../errors/NotFoundError';

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

    db.run("UPDATE config SET value = ?, lastUpdated = ? WHERE key = ?;", [value, now, key], (_: RunResult, err: Error) => {
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

export const getConfig = (key: string): Promise<string | number> => {
  return new Promise((resolve: Function, reject: Function) => {

    db.get("SELECT key, value FROM config WHERE key = ?;", [key], (err: Error, config: IConfig) => {
      if (err) {
        return reject(err);
      }

      if (!config) {
        return reject(new NotFoundError(`No no config with key (${key}) found`));
      }

      return resolve(config.value);
    });
  });
};

export const getAllConfigs = (): Promise<IConfigs> => {
  return new Promise((resolve: Function, reject: Function) => {

    db.all("SELECT value FROM config;", [], (err: Error, configs: IConfig[]) => {
      if (err) {
        return reject(err);
      }

      if (!configs) {
        return reject(new NotFoundError("No configs found"));
      }

      return resolve(
        configs.reduce((acc: IConfigs, cur: IConfig) => {
          acc[cur.key] = cur.value;

          return acc;
        }, {})
      );
    });
  });
};


export default {
  getConf: getConfig,
  getAll: getAllConfigs,
  add: addConfig,
  update: updateConfig,
  delete: deleteConfig
};
