import { RunResult } from 'sqlite3';
import db from './db';
import IUser from '../interfaces/IUser';
import NotFoundError from '../errors/NotFoundError';

export const addUser = (user: IUser): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    const stmt = db.prepare("INSERT INTO users (name, phone) VALUES (?, ?)");
    stmt.run([user.name, user.phone], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }
    });
    stmt.finalize((err: Error) => {
      if (err) {
        return reject(err);
      };

      return resolve();
    });
  });
}

export const getUser = {
  byName: (name: string): Promise<IUser> => {
    return new Promise((resolve: Function, reject: Function) => {
      db.get("SELECT * FROM users WHERE name = ?", [name], (err: Error, user: IUser) => {
        if (err) {
          return reject(err);
        }
        
        if (!user) {
          return reject(new NotFoundError("No user with that name"));
        }

        return resolve(user);
      })
    });
  },
  byPhone: (phone: number): Promise<IUser> => {
    return new Promise((resolve: Function, reject: Function) => {
      db.get("SELECT * FROM users WHERE phone = ?", [phone], (err: Error, user: IUser) => {
        if (err) {
          return reject(err);
        }
        
        if (!user) {
          return reject(new NotFoundError("No user with that phone"));
        }

        return resolve(user);
      })
    }); 
  },
};

export const findUser = {
  byName: (name: string): Promise<IUser> => {
    return new Promise((resolve: Function, reject: Function) => {
      db.get("SELECT * FROM users WHERE name LIKE ?", [`%${name}%`], (err: Error, user: IUser) => {
        if (err) {
          return reject(err);
        }
        
        if (!user) {
          return reject(new NotFoundError("No user with that name"));
        }

        return resolve(user);
      })
    });
  },
  byPhone: (phone: number): Promise<IUser> => {
    return new Promise((resolve: Function, reject: Function) => {
      db.get("SELECT * FROM users WHERE phone LIKE ?", [`%${phone}%`], (err: Error, user: IUser) => {
        if (err) {
          return reject(err);
        }
        
        if (!user) {
          return reject(new NotFoundError("No user with that phone"));
        }

        return resolve(user);
      })
    });
  },
};

export const deleteUser = {
  byPhone: (phone: number): Promise<void> => {
    return new Promise((resolve: Function, reject: Function) => {
      db.run("DELETE FROM users WHERE phone = ?", [phone], (err: Error, user: IUser) => {
        if (err) {
          return reject(err);
        }

        return resolve(user);
      })
    }); 
  },
  byName: (nameId: string): Promise<void> => {
    return new Promise((resolve: Function, reject: Function) => {
      db.run("DELETE FROM users WHERE name = ?", [nameId], (err: Error, user: IUser) => {
        if (err) {
          return reject(err);
        }

        return resolve(user);
      })
    }); 
  },
};

export const getAll = (): Promise<IUser[]> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.all("SELECT * FROM users", (err: Error, users: IUser[]) => {
      if (err) {
        return reject(err);
      }
      
      if (users.length === 0) {
        return reject(new NotFoundError("No users found"));
      }

      return resolve(users);
    })
  });
};

export default {
  add: addUser,
  get: getUser,
  find: findUser,
  delete: deleteUser,
  getAll: getAll,
};
