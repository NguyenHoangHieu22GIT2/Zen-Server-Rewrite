import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterEndUserDto } from '../dto/register-end-user.dto';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

import { AuthServiceStable } from '../stable/auth.stable.service';
import { LoginEndUserDto } from '../dto/login-end-user.dto';
import { v4 } from 'uuid';
import { checkingToConvertToObjectFromDocument } from 'src/common/utils/convertToObjectMongodb';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';

@Injectable()
export class AuthServiceUnstable {
  constructor(private readonly authServiceStable: AuthServiceStable) {}

  async registerAccount(registerEndUserDto: RegisterEndUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(
        registerEndUserDto.password,
        +process.env.BCRYPT_HASH,
      );

      const accountInfo: Partial<EndUser> = {
        ...registerEndUserDto,
        password: hashedPassword,
        activationToken: v4(),
      };

      const createdAccount = await this.authServiceStable.create(accountInfo);

      return createdAccount;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async activateAccount(inactivateAccount: DocumentMongodbType<EndUser>) {
    try {
      // Set To undefined so the property in mongodb document remove the field entirely
      inactivateAccount.activationToken = undefined;
      const activatedAccount = inactivateAccount;

      return activatedAccount.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async loginAccount(loginEndUserDto: LoginEndUserDto) {
    try {
      const existedAccount =
        await this.authServiceStable.checkLoginAccount(loginEndUserDto);

      if (existedAccount.activationToken) {
        throw new UnauthorizedException(
          'This account has not been activated, please go to your email account to activate it',
        );
      }

      await this.authServiceStable.checkPasswordAndThrowErrorIfNotMatch(
        loginEndUserDto.password,
        existedAccount.password,
      );

      const convertedExistedAccount =
        checkingToConvertToObjectFromDocument(existedAccount);

      return convertedExistedAccount;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async forgotPassword(existedAccount: DocumentMongodbType<EndUser>) {
    try {
      existedAccount.modifyToken = v4();

      const savedUser = await existedAccount.save();

      return savedUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async changeForgottonPassword(
    existedAccount: DocumentMongodbType<EndUser>,
    newPassword: string,
  ) {
    try {
      existedAccount.modifyToken = undefined;
      existedAccount.password = await bcrypt.hash(
        newPassword,
        +process.env.BCRYPT_HASH,
      );

      return existedAccount.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
