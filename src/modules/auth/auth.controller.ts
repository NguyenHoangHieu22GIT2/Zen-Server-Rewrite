import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  Inject,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SerializeDecorator } from 'src/cores/interceptors/';
import { EndUserSerializeDto } from 'src/modules/users/enduser/';
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

import { MailerService } from '@nestjs-modules/mailer';
import { forgotPasswordMail, registerMail } from 'src/common/mails/auth';
import { IAuthService, IAuthServiceString } from './service/auth.interface';
import { AuthRedisService } from './service';

@ApiTags('Authentication/Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthServiceString)
    private readonly authService: IAuthService,
    private readonly authRedisStableService: AuthRedisService,
    private readonly mailerService: MailerService,
  ) {}

  @RegisterAccountSwaggerAPIDecorators()
  @Post('register-account')
  @SerializeDecorator(EndUserSerializeDto)
  async registerAccount(@Body() registerEndUserDto: RegisterEndUserDto) {
    const message = 'This email is already in used. Try another one';

    const isExistedRedis =
      await this.authRedisStableService.isEmailAlreadyRegistered(
        registerEndUserDto.email,
      );

    if (isExistedRedis) {
      throw new BadRequestException(message);
    }
    const isExisted = await this.authService.findAccountFilterQuery({
      email: registerEndUserDto.email,
    });

    if (isExisted) {
      throw new BadRequestException(message);
    }

    const result = await this.authService.registerAccount(registerEndUserDto);

    await this.mailerService.sendMail(
      registerMail(result.email, result.activationToken),
    );

    await this.authRedisStableService.addUserRegisteredToRedis(
      registerEndUserDto.email,
    );
    return result;
  }

  //check the sent activation token  & remove the activate token field in the db
  @ActivateAccountSwaggerAPIDecorators()
  @Get('activate-account/:activationToken')
  async activateAccount(@Param() activateAccountDto: ActivateAccountDto) {
    const account = await this.authService.activateAccount(activateAccountDto);
    if (!account) {
      return "There's no user with this token";
    }
    return 'You activated this account successfully';
  }

  @LoginAccountSwaggerAPIDecorators()
  @Patch('login-account')
  @UseGuards(LocalGuard)
  @SerializeDecorator(EndUserSerializeDto)
  loginAccount(@Req() req: Request) {
    console.log(req.user, 'req.user');
    return req.user;
  }

  @ForgotPasswordSwaggerAPIDecorators()
  @Patch('forgot-password')
  @SerializeDecorator(EndUserSerializeDto)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(forgotPasswordDto);
    await this.mailerService.sendMail(
      forgotPasswordMail(result.email, result.modifyToken),
    );
    return result;
  }

  @ChangeForgottonPasswordSwaggerAPIDecorators()
  @Patch('change-forgottent-password')
  @SerializeDecorator(EndUserSerializeDto)
  async changeForgottonPassword(
    @Body() changeForgottonPasswordDto: ChangeForgottonPasswordDto,
  ) {
    const user = await this.authService.changeForgottonPassword(
      changeForgottonPasswordDto,
    );

    await this.authRedisStableService.userConvertToRedisTypeThenHSET(
      user.toObject(),
    );
    return user;
  }
}
