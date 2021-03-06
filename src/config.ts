import { getDockerSecrets } from 'get-docker-secrets';
const secrets = getDockerSecrets();

// Nexmo config
export const NEXMO_API                    = secrets.NEXMO_API                     ||  process.env.NEXMO_API;
export const NEXMO_SECRET                 = secrets.NEXMO_SECRET                  ||  process.env.NEXMO_SECRET;
export const NEXMO_APPLICATION            = secrets.NEXMO_APPLICATION             ||  process.env.NEXMO_APPLICATION;

// SMS Rate Limiting
export const FREQUENCY_LIMIT              = parseInt(secrets.FREQUENCY_LIMIT, 10) ||  parseInt(process.env.FREQUENCY_LIMIT, 10)        || 300;

// Discrod Config
export const DISCORD_CLIENT_ID            = secrets.DISCORD_CLIENT_ID             ||  process.env.DISCORD_CLIENT_ID;
export const DISCORD_CLIENT_SECRET        = secrets.DISCORD_CLIENT_SECRET         ||  process.env.DISCORD_CLIENT_SECRET;
export const DISCORD_SMS_BOT_TOKEN        = secrets.DISCORD_SMS_BOT_TOKEN         ||  process.env.DISCORD_SMS_BOT_TOKEN;
export const DISCORD_SMS_BOT_COMMAND      = secrets.DISCORD_SMS_BOT_COMMAND       ||  process.env.DISCORD_SMS_BOT_COMMAND              || '!sms';
export const DISCORD_GENERAL_BOT_TOKEN    = secrets.DISCORD_GENERAL_BOT_TOKEN     ||  process.env.DISCORD_GENERAL_BOT_TOKEN;
export const DISCORD_GENERAL_BOT_COMMAND  = secrets.DISCORD_GENERAL_BOT_COMMAND   ||  process.env.DISCORD_GENERAL_BOT_COMMAND          || '!hacksoc';
export const GUILD_ID                     = secrets.GUILD_ID                      ||  process.env.GUILD_ID;
export const MEMBER_ROLE_ID               = secrets.MEMBER_ROLE_ID                ||  process.env.MEMBER_ROLE_ID;
export const JOB_APPROVAL_CHANNEL_ID      = secrets.JOB_APPROVAL_CHANNEL_ID       ||  process.env.JOB_APPROVAL_CHANNEL_ID;
export const JOB_CHANNEL_ID               = secrets.JOB_CHANNEL_ID                ||  process.env.JOB_CHANNEL_ID;

// Mailgun Config
export const MAILGUN_API                  = secrets.MAILGUN_API                   ||  process.env.MAILGUN_API;
export const MAILGUN_DOMAIN               = secrets.MAILGUN_DOMAIN                ||  process.env.MAILGUN_DOMAIN;

// Service Config
export const DB_LOCATION                  = secrets.DB_LOCATION                   ||  process.env.DB_LOCATION                          || `${__dirname}/../volumes/database`;
export const PORT                         = secrets.PORT                          ||  process.env.PORT                                 || 3000;

// UMSL Configuration
export const UKMSL_BASE_URL               = secrets.UKMSL_BASE_URL                ||  process.env.UKMSL_BASE_URL;
export const UKMSL_DOMAIN                 = secrets.UKMSL_DOMAIN                  ||  process.env.UKMSL_DOMAIN;
export const UKMSL_GROUP_ID               = parseInt(secrets.UKMSL_GROUP_ID, 10)  ||  parseInt(process.env.UKMSL_GROUP_ID, 10);
export const UKMSL_ASPNET_SESSIONID       = secrets.UKMSL_ASPNET_SessionId        ||  process.env.UKMSL_ASPNET_SessionId;
export const UKMSL_ASPXAUTH               = secrets.UKMSL_ASPXAUTH                ||  process.env.UKMSL_ASPXAUTH;
export const UKMSL_ANTI_XSRF_TOKEN        = secrets.UKMSL_AntiXsrfToken           ||  process.env.UKMSL_AntiXsrfToken;
export const UKMSL_FORM_BODY              = secrets.UKMSL_FORM_BODY               ||  process.env.UKMSL_FORM_BODY;

// Vote Bot Member List 
export const VOTE_MEMBERS_HOOK            = secrets.VOTE_MEMBERS_HOOK             || process.env.VOTE_MEMBERS_HOOK;
export const VOTE_MEMBERS_SECRET          = secrets.VOTE_MEMBERS_SECRET           || process.env.VOTE_MEMBERS_SECRET;
