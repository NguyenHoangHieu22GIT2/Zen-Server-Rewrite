import { Controller, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { AuthServiceUnstable } from './unstable/auth.unstable.service';
import { RegisterEndUserDto } from './dto/register-end-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAccountSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/registerAccount.api';
import { LoginAccountSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/loginAccount.api';
import { LocalGuard } from './passport/local.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ForgotPasswordSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/forgot-password.api';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { ActivateAccountSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/activate-account.api';
import { ChangeForgottonPasswordDto } from './dto/change-forgotton-password.dto';
import { SerializeDecorator } from 'src/cores/interceptors/Serialize.interceptor';
import { EndUserSerializeDto } from '../users/enduser/dto/enduser.serialize.dto';
import { Request } from 'express';
import { ChangeForgottonPasswordSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/change-forgotten-password.api';

import { AuthRedisStableService } from './stable/auth.redis.stable.service';
import { AuthServiceStable } from './stable/auth.stable.service';

@ApiTags('Authentication/Authorization')
@SerializeDecorator(EndUserSerializeDto)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authServiceUnstable: AuthServiceUnstable,
    private readonly authRedisStableService: AuthRedisStableService,
    private readonly authServiceStable: AuthServiceStable,
  ) {}

  @RegisterAccountSwaggerAPIDecorators()
  @Post('register-account')
  async registerAccount(@Body() registerEndUserDto: RegisterEndUserDto) {
    const message = 'This email is already in used. Try another one';

    await this.authRedisStableService.checkRegisteredAccount(
      registerEndUserDto.email,
      message,
    );
    await this.authServiceStable.checkRegisteredAccount(
      registerEndUserDto.email,
      message,
    );

    const result =
      await this.authServiceUnstable.registerAccount(registerEndUserDto);

    // await this.mailerService.sendMail(registerMail(result.email, result.token));

    await this.authRedisStableService.usersHaveRegisteredPFADD(
      registerEndUserDto.email,
    );
    return result;
  }

  @ActivateAccountSwaggerAPIDecorators()
  @Patch('activate-account')
  async activateAccount(@Body() { activationToken }: ActivateAccountDto) {
    const inactivateAccount =
      await this.authServiceStable.checkAccountIfNotExistThenThrowError({
        filterQuery: { activationToken },
        message: 'We found no account with this token!',
      });

    return this.authServiceUnstable.activateAccount(inactivateAccount);
  }

  @LoginAccountSwaggerAPIDecorators()
  @Patch('login-account')
  @UseGuards(LocalGuard)
  loginAccount(@Req() req: Request) {
    return req.user;
  }

  @ForgotPasswordSwaggerAPIDecorators()
  @Patch('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const user =
      await this.authServiceStable.checkAccountIfNotExistThenThrowError({
        filterQuery: { email: forgotPasswordDto.email },
        message: 'Check your Input carefully please!',
      });

    const result = await this.authServiceUnstable.forgotPassword(user);
    // await this.mailerService.sendMail(
    //   forgotPasswordMail(result.email, result.token),
    // );
    return result;
  }

  @ChangeForgottonPasswordSwaggerAPIDecorators()
  @Patch('change-forgottent-password')
  async changeForgottonPassword(
    @Body() changeForgottonPasswordDto: ChangeForgottonPasswordDto,
  ) {
    const existedAccount =
      await this.authServiceStable.checkAccountIfNotExistThenThrowError({
        filterQuery: { modifyToken: changeForgottonPasswordDto.modifyToken },
        message: 'This is not the right place for you to be. Get out.',
      });

    const user = await this.authServiceUnstable.changeForgottonPassword(
      existedAccount,
      changeForgottonPasswordDto.password,
    );

    await this.authRedisStableService.userConvertToRedisTypeThenHSET(
      user.toObject(),
    );
    return user;
  }
}
