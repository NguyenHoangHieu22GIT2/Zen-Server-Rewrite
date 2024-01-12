import { Controller, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { AuthServiceUnstable } from './unstable/auth.unstable.service';
import { RegisterEndUserDto } from './dto/register-end-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAccountSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/registerAccount.api';
import { LoginEndUserDto } from './dto/login-end-user.dto';
import { LoginAccountSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/loginAccount.api';
import { LocalGuard } from './passport/local.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { registerMail } from 'src/common/mails/auth/register.mail';
import { forgotPasswordMail } from 'src/common/mails/auth/forgot-password.mail';
import { ForgotPasswordSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/forgot-password.api';
@ApiTags('Authentication/Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authServiceUnstable: AuthServiceUnstable,
    private readonly mailerService: MailerService,
  ) {}

  @RegisterAccountSwaggerAPIDecorators()
  @Post('register-account')
  async registerAccount(@Body() registerEndUserDto: RegisterEndUserDto) {
    const result =
      await this.authServiceUnstable.registerAccount(registerEndUserDto);

    await this.mailerService.sendMail(registerMail(result.email, result.token));

    const { token, email, ...user } = result;
    return user;
  }

  @LoginAccountSwaggerAPIDecorators()
  @UseGuards(LocalGuard)
  @Patch('login-account')
  loginAccount(@Body() loginEndUserDto: LoginEndUserDto) {
    return this.authServiceUnstable.loginAccount(loginEndUserDto);
  }

  @ForgotPasswordSwaggerAPIDecorators()
  @Patch('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result =
      await this.authServiceUnstable.forgotPassword(forgotPasswordDto);

    await this.mailerService.sendMail(
      forgotPasswordMail(result.email, result.token),
    );

    const { token, email, ...user } = result;
    return user;
  }
}
