export const NEXMO_API = process.env.NEXMO_API;
export const NEXMO_SECRET = process.env.NEXMO_SECRET;
export const NEXMO_APPLICATION = process.env.NEXMO_APPLICATION;
export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
export const DISCORD_BOT_COMMAND = process.env.DISCORD_BOT_COMMAND || '!sms';
export const DB_LOCATION = process.env.DB_LOCATION || `${__dirname}/../volumes/database`;
export const FREQUENCY_LIMIT = process.env.FREQUENCY_LIMIT as unknown as number || 300;
