import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { RegisterEndUserDto } from '../dto/register-end-user.dto';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

import { AuthServiceStable } from '../stable/auth.stable.service';
import { LoginEndUserDto } from '../dto/login-end-user.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { v4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { emailHtmlTemplate } from 'src/common/constants/emailHtmlTemplate';
import { TEXTS } from 'src/common/constants/texts';
import { registerMail } from 'src/common/mails/auth/register.mail';
import { forgotPasswordMail } from 'src/common/mails/auth/forgot-password.mail';

@Injectable()
export class AuthServiceUnstable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
    private readonly authServiceStable: AuthServiceStable,
    private readonly mailerService: MailerService,
  ) {}

  async registerAccount(createEndUserDto: RegisterEndUserDto) {
    try {
      await this.authServiceStable.checkAccountIfAlreadyExistThenThrowError({
        email: createEndUserDto.email,
        message: 'This email is already in used. Try another one',
      });

      const hashedPassword = await bcrypt.hash(
        createEndUserDto.password,
        +process.env.BCRYPT_HASH,
      );

      const accountInfo: Partial<EndUser> = {
        ...createEndUserDto,
        password: hashedPassword,
        token: v4(),
      };

      const createdAccount = await this.EndUserModel.create(accountInfo);
      const { _id, username, token, email } = createdAccount;
      return { _id, username, token, email };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //TODO: Activate Account Function
  async activateAccount(token: string) {}

  async loginAccount(loginEndUserDto: LoginEndUserDto) {
    try {
      const existedAccount =
        await this.authServiceStable.checkAccountIfAlreadyExistThenThrowError({
          email: loginEndUserDto.email,
          message: 'Invalid Email!',
        });

      const isMatchedPassword = await bcrypt.compare(
        loginEndUserDto.password,
        existedAccount.password,
      );

      if (!isMatchedPassword) {
        throw new UnauthorizedException('Invalid Password');
      }
      const { _id, username, avatar } = existedAccount;
      return {
        _id,
        username,
        avatar,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const user =
        await this.authServiceStable.checkAccountIfNotExistThenThrowError({
          email: forgotPasswordDto.email,
          message: 'Check your Input carefully please!',
        });

      user.token = v4();

      const savedUser = await user.save();

      const { _id, username, token, email } = savedUser;

      return {
        _id,
        username,
        token,
        email,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
