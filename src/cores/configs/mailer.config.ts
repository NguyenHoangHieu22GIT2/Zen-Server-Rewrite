import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerConfig implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: {
        service: this.configService.get<string>('mailer_service'),
        // host: this.configService.get<string>('mailer_host'),
        auth: {
          user: this.configService.get<string>('mailer_username'),
          pass: this.configService.get<string>('mailer_password'),
        },
      },
    };
  }
}
