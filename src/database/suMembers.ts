import db from './db';
import { RunResult } from 'sqlite3';
import NotFoundError from '../errors/NotFoundError';
import IMember from '../interfaces/IMember';

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
    db.get("SELECT * FROM member WHERE id=?;", [id], (err: Error, row: IMember) => {
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
  add: addMember,
  remove: removeMember,
  getAll: getAllMembers,
  get: getMember,
};