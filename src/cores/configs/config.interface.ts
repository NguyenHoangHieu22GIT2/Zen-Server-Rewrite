export interface IConfig {
  bcrypt_hash: number;
  db_url: string;
  db_name: string;
  app_name: string;
  redis_host: string;
  mailer_password: string;
  redis_port: number;
  mailer_username: string;
  mailer_service: string;
  mailer_host: string;
  testing: boolean;
}
