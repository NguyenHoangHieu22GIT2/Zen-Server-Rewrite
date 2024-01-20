import { Controller, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { AuthServiceUnstable } from './unstable/auth.unstable.service';
import { RegisterEndUserDto } from './dto/register-end-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAccountSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/registerAccount.api';
import { LoginAccountSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/loginAccount.api';
import { LocalGuard } from './passport/local.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPasswordSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/forgot-password.api';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { ActivateAccountSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/activate-account.api';
import { ChangeForgottonPasswordDto } from './dto/change-forgotton-password.dto';
import { SerializeDecorator } from 'src/cores/interceptors/Serialize.interceptor';
import { EndUserSerializeDto } from '../users/enduser/dto/enduser.serialize.dto';
import { Request } from 'express';
import { ChangeForgottonPasswordSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/change-forgotten-password.api';
import { RedisClient } from 'src/cores/redis/client.redis';
import { UserRedis } from 'src/cores/redis/user.redis';
@ApiTags('Authentication/Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authServiceUnstable: AuthServiceUnstable) {}

  @RegisterAccountSwaggerAPIDecorators()
  @SerializeDecorator(EndUserSerializeDto)
  @Post('register-account')
  async registerAccount(@Body() registerEndUserDto: RegisterEndUserDto) {
    const result =
      await this.authServiceUnstable.registerAccount(registerEndUserDto);

    // await this.mailerService.sendMail(registerMail(result.email, result.token));

    if (RedisClient.isOpen) {
      await UserRedis.usersHaveRegisteredPFADD(registerEndUserDto.email);
    }
    return result;
  }

  @ActivateAccountSwaggerAPIDecorators()
  @SerializeDecorator(EndUserSerializeDto)
  @Patch('activate-account')
  async activateAccount(@Body() activateAccountDto: ActivateAccountDto) {
    return this.authServiceUnstable.activateAccount(
      activateAccountDto.activationToken,
    );
  }

  @LoginAccountSwaggerAPIDecorators()
  @SerializeDecorator(EndUserSerializeDto)
  @Patch('login-account')
  @UseGuards(LocalGuard)
  loginAccount(@Req() req: Request) {
    return req.user;
  }

  @ForgotPasswordSwaggerAPIDecorators()
  @SerializeDecorator(EndUserSerializeDto)
  @Patch('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result =
      await this.authServiceUnstable.forgotPassword(forgotPasswordDto);
    // await this.mailerService.sendMail(
    //   forgotPasswordMail(result.email, result.token),
    // );
    return result;
  }

  @ChangeForgottonPasswordSwaggerAPIDecorators()
  @Patch('change-forgottent-password')
  @SerializeDecorator(EndUserSerializeDto)
  async changeForgottonPassword(
    @Body() changeForgottonPasswordDto: ChangeForgottonPasswordDto,
  ) {
    const user = await this.authServiceUnstable.changeForgottonPassword(
      changeForgottonPasswordDto,
    );
    if (RedisClient.isOpen) {
      await UserRedis.userConvertToRedisTypeThenHSET(
        user.email,
        user.toObject(),
      );
    }
    return user;
  }
}
