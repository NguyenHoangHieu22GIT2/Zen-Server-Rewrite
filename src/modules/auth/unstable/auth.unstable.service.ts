import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { RegisterEndUserDto } from '../dto/register-end-user.dto';
import { EndUser } from '../../enduser/entities/enduser.entity';
import { AuthServiceStable } from '../stable/auth.stable.service';
import { LoginEndUserDto } from '../dto/login-end-user.dto';

@Injectable()
export class AuthServiceUnstable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
    private readonly authServiceStable: AuthServiceStable,
  ) {}

  async registerAccount(createEndUserDto: RegisterEndUserDto) {
    const existedUser = await this.authServiceStable.checkAccountIfAlreadyExist(
      createEndUserDto.email,
    );
    if (existedUser !== null) {
      throw new ConflictException(
        'This email is already in used. Try another one',
      );
    }
    const hashedPassword = await bcrypt.hash(
      createEndUserDto.password,
      +process.env.BCRYPT_HASH,
    );
    const createdUser = {
      ...createEndUserDto,
      password: hashedPassword,
    };
    return this.EndUserModel.create(createdUser);
  }

  async loginAccount(loginEndUserDto: LoginEndUserDto) {
    try {
      const existedUser =
        await this.authServiceStable.checkAccountIfAlreadyExist(
          loginEndUserDto.email,
        );

      if (existedUser === null) {
        throw new UnauthorizedException('Invalid Email');
      }

      const isMatchedPassword = await bcrypt.compare(
        loginEndUserDto.password,
        existedUser.password,
      );

      if (!isMatchedPassword) {
        throw new UnauthorizedException('Invalid Password');
      }

      return 'You logged in successfully';
    } catch (error) {
      throw error;
    }
  }
}
