import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SerializeDecorator } from 'src/cores/interceptors/';
import { EndUserSerializeDto } from 'src/modules/users/enduser/';
import { AuthRedisStableService } from './stable/';
import {
  RegisterAccountSwaggerAPIDecorators,
  ActivateAccountSwaggerAPIDecorators,
  LoginAccountSwaggerAPIDecorators,
  ForgotPasswordSwaggerAPIDecorators,
  ChangeForgottonPasswordSwaggerAPIDecorators,
} from 'src/documents/swagger-api/auth/';
import {
  RegisterEndUserDto,
  ActivateAccountDto,
  ForgotPasswordDto,
  ChangeForgottonPasswordDto,
} from './dto/';
import { LocalGuard } from './passport/';
import {
  IAuthServiceStable,
  IAuthServiceStableString,
} from './stable/auth.stable.interface';
import {
  IAuthUnstableService,
  IAuthUnstableServiceString,
} from './unstable/auth.unstable.interface';

@ApiTags('Authentication/Authorization')
@SerializeDecorator(EndUserSerializeDto)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthUnstableServiceString)
    private readonly authServiceUnstable: IAuthUnstableService,
    private readonly authRedisStableService: AuthRedisStableService,
    @Inject(IAuthServiceStableString)
    private readonly authServiceStable: IAuthServiceStable,
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
  async activateAccount(@Body() activateAccountDto: ActivateAccountDto) {
    return this.authServiceUnstable.activateAccount(activateAccountDto);
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
    const result =
      await this.authServiceUnstable.forgotPassword(forgotPasswordDto);
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
    const user = await this.authServiceUnstable.changeForgottonPassword(
      changeForgottonPasswordDto,
      changeForgottonPasswordDto.password,
    );

    await this.authRedisStableService.userConvertToRedisTypeThenHSET(
      user.toObject(),
    );
    return user;
  }
}
