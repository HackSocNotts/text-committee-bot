export const initUsers = (): string => {
  let query = 'CREATE TABLE IF NOT EXISTS users (';
  query += 'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,';
  query += 'name TEXT NOT NULL,';
  query += 'phone INT UNIQUE NOT NULL);';

  return query;
};

export const initChannels = (): string => {
  let query = 'CREATE TABLE IF NOT EXISTS channels (';
  query += 'name TEXT NOT NULL,';
  query += 'id TEXT UNIQUE NOT NULL);';

  return query;
};
