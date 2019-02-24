export const NEXMO_API = process.env.NEXMO_API;
export const NEXMO_SECRET = process.env.NEXMO_SECRET;
export const NEXMO_APPLICATION = process.env.NEXMO_APPLICATION;
export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
export const DISCORD_SMS_BOT_TOKEN = process.env.DISCORD_SMS_BOT_TOKEN;
export const DISCORD_SMS_BOT_COMMAND = process.env.DISCORD_SMS_BOT_COMMAND || '!sms';
export const DISCORD_GENERAL_BOT_TOKEN = process.env.DISCORD_GENERAL_BOT_TOKEN;
export const DISCORD_GENERAL_BOT_COMMAND = process.env.DISCORD_GENERAL_BOT_COMMAND || '!hacksoc';
export const DB_LOCATION = process.env.DB_LOCATION || `${__dirname}/../volumes/database`;
export const FREQUENCY_LIMIT = process.env.FREQUENCY_LIMIT as unknown as number || 300;

// UMSL Configuration
export const UKMSL_BASE_URL = process.env.UKMSL_BASE_URL;
export const UKMSL_DOMAIN = process.env.UKMSL_DOMAIN;
export const UKMSL_GROUP_ID = parseInt(process.env.UKMSL_GROUP_ID, 10);
export const UKMSL_ASPNET_SessionId = process.env.UKMSL_ASPNET_SessionId;
export const UKMSL_ASPXAUTH = process.env.UKMSL_ASPXAUTH;
export const UKMSL_AntiXsrfToken = process.env.UKMSL_AntiXsrfToken;
export const UKMSL_FORM_BODY = process.env.UKMSL_FORM_BODY;