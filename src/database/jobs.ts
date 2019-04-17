import { RunResult } from 'sqlite3';
import db from './db';
import NotFoundError from '../errors/NotFoundError';
import IJob from '../interfaces/IJob';
import { Snowflake } from 'discord.js';

export const addJob = (job: IJob): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    db.run("INSERT INTO jobs (email, name, title, company, description, approvalMessage) VALUES (?, ?, ?, ?, ?, ?);", [job.email, job.name, job.title, job.company, job.description, job.approvalMessage], (_: RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

export const getJob = {
  byApproval: (message: Snowflake): Promise<IJob> => {
    return new Promise((resolve: Function, reject: Function) => {
      db.get("SELECT * FROM jobs WHERE approvalMessage = ?", [message], (err: Error, job: IJob) => {
        if (err) {
          return reject(err);
        }
        
        if (!job) {
          return reject(new NotFoundError("No job from that message"));
        }

        return resolve(job);
      })
    });
  },
  byPosting: (message: Snowflake): Promise<IJob> => {
    return new Promise((resolve: Function, reject: Function) => {
      db.get("SELECT * FROM jobs WHERE postedMessage = ?", [message], (err: Error, job: IJob) => {
        if (err) {
          return reject(err);
        }
        
        if (!job) {
          return reject(new NotFoundError("No job from that message"));
        }

        return resolve(job);
      })
    });
  },
  byMessage: (message: Snowflake): Promise<IJob> => {
    return new Promise((resolve: Function, reject: Function) => {
      db.get("SELECT * FROM jobs WHERE postedMessage = ? OR approvalMessage = ?;", [message, message], (err: Error, job: IJob) => {
        if (err) {
          return reject(err);
        }
        
        if (!job) {
          return reject(new NotFoundError("No job from that message"));
        }

        return resolve(job);
      })
    });
  },
};

export const approve = (message: Snowflake, posting: Snowflake): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    const stmt = db.prepare("UPDATE jobs SET postedMessage = ?, approved = 1 WHERE approvalMessage = ? ;");
    stmt.run([posting, message], (_: RunResult, err: Error) => {
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

export const decline = (message: Snowflake): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
    const stmt = db.prepare("UPDATE jobs SET approved = 0 WHERE approvalMessage = ? ;");
    stmt.run([message], (_: RunResult, err: Error) => {
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

export const ban = {
  add: (email: string): Promise<void> => {
    return new Promise((resolve: Function, reject: Function) => {
      const stmt = db.prepare("INSERT INTO bannedSubmitters (submitterEmail) VALUES (?)");
      stmt.run([email], (_: RunResult, err: Error) => {
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
  },
  search: (email: string): Promise<boolean> => {
    return new Promise((resolve: Function, reject: Function) => {
      const stmt = db.prepare("SELECT count(id) FROM bannedSubmitters WHERE submitterEmail = ?;");
      stmt.get([email], (err: Error, row: number) => {
        if (err) {
          return reject(err);
        }
  
        if (!row) {
          return resolve(false);
        }
  
        return resolve(true);
      });
    });
  }
}

export default {
  add: addJob,
  get: getJob,
  ban: ban,
  approve,
  reject: decline,
};
