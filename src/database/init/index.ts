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


export const initLog = (): string => {
  let query = 'CREATE TABLE IF NOT EXISTS log (';
  query += 'userId TEXT,';
  query += 'message TEXT NOT NULL,';
  query += 'timestamp DATETIME NOT NULL);';

  return query;
}

export const initConfig = (): string => {
  let query = 'CREATE TABLE IF NOT EXISTS config (';
  query += 'key TEXT UNIQUE NOT NULL,';
  query += 'value TEXT,';
  query += 'lastUpdated DATETIME NOT NULL);';

  return query;
}
