import db from './db';
import { RunResult } from 'sqlite3';
import NotFoundError from '../errors/NotFoundError';
import IMember from '../interfaces/IMember';
import { Snowflake } from 'discord.js';

export const addMember = (member: IMember): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.run("INSERT INTO members (id, name) VALUES (?, ?)", [member.id, member.name], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

export const removeMember = (id: number): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.run("DELETE FROM members WHERE id=?", [id], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

export const getAllMembers = (): Promise<IMember[]> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.all("SELECT * FROM members", (err: Error, rows: IMember[]) => {
      if (err) {
        return reject(err);
      }

      return resolve(rows);
    });
  });
};

export const getMember = (id: number): Promise<IMember> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.get("SELECT * FROM members WHERE id=?;", [id], (err: Error, row: IMember) => {
      if (err) {
        return reject(err);
      }

      if (!row) {
        return reject(new NotFoundError("No member exists with that id"));
      }

      return resolve(row);
    });
  });
};

export const updateDiscordId = (id: number, discordID: Snowflake) => {
  return new Promise((resolve: Function, reject: Function) => {
    db.run("UPDATE members SET discordId=? WHERE id=?;", [discordID, id], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

export default {
  add: addMember,
  remove: removeMember,
  getAll: getAllMembers,
  get: getMember,
  addDiscord: updateDiscordId,
};