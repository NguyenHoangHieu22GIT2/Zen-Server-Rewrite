// Libraries
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
// Local
import { CreateEnduserDto } from './dto/create-end-user.dto';
import { EndUser } from '../enduser/entities/enduser.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {}

  async checkAccountIfAlreadyExist(email: string) {
    const user = await this.EndUserModel.findOne({ email }, { password: -1 });
    return user ? user : null;
  }

  async registerAccount(createEndUserDto: CreateEnduserDto) {
    const existedUser = await this.checkAccountIfAlreadyExist(
      createEndUserDto.email,
    );
    if (existedUser === null) {
      throw new ConflictException(
        'This email is already in used. Try another one',
      );
    }
    const hashedPassword = bcrypt.hash(
      createEndUserDto.password,
      +process.env.BCRYPT_HASH,
    );
    const createdUser = {
      ...createEndUserDto,
      password: hashedPassword,
    };
    return this.EndUserModel.create(createdUser);
  }
}
