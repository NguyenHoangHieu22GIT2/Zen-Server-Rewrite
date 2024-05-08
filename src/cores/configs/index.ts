import { IConfig } from './config.interface';

export function config(): IConfig {
  return {
    bcrypt_hash: parseInt(process.env.BCRYPT_HASH),
    db_url: process.env.DB_URL,
    db_name: process.env.DB_NAME,
    app_name: process.env.APP_NAME,

    redis_host: process.env.REDIS_HOST,
    mailer_password: process.env.MAILER_PASSWORD,
    redis_port: parseInt(process.env.REDIS_PORT),

    mailer_username: process.env.MAILER_USERNAME,
    mailer_service: process.env.MAILER_SERVICE,
    mailer_host: process.env.MAILER_HOST,

    testing: process.env.TESTING === 'true' ? true : false,
  };
}
