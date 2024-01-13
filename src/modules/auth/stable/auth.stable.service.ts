import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';
import * as bcrypt from 'bcryptjs';
import { LoginEndUserDto } from '../dto/login-end-user.dto';
import { UserRedis } from 'src/cores/redis/user.redis';

@Injectable()
export class AuthServiceStable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {}
  // Checks
  private async checkAccountIfAlreadyExist(
    filterQuery: FilterQuery<EndUser>,
  ): Promise<DocumentMongodbType<EndUser>> | null {
    const user = await this.EndUserModel.findOne(filterQuery);
    return user ? user : null;
  }

  public async checkAccountIfAlreadyExistThenThrowError({
    filterQuery,
    message,
  }: {
    filterQuery: FilterQuery<EndUser>;
    message: string;
  }) {
    const user = await this.checkAccountIfAlreadyExist(filterQuery);
    if (user) {
      throw new ConflictException(message);
    }
    return user ? user : null;
  }

  public async checkAccountIfNotExistThenThrowError({
    filterQuery,
    message,
  }: {
    filterQuery: FilterQuery<EndUser>;
    message: string;
  }) {
    const user = await this.checkAccountIfAlreadyExist(filterQuery);
    if (!user) {
      throw new UnauthorizedException(message);
    }
    return user;
  }

  public async findAccountById(_id: Types.ObjectId) {
    return this.checkAccountIfAlreadyExist({ _id });
  }

  public async checkLoginAccount(
    loginEndUserDto: LoginEndUserDto,
  ): Promise<EndUser | DocumentMongodbType<EndUser>> {
    let existedAccount = await UserRedis.findUserHGETALLThenDeserialize(
      loginEndUserDto.email,
    );

    if (!existedAccount) {
      existedAccount = await this.checkAccountIfNotExistThenThrowError({
        filterQuery: { email: loginEndUserDto.email },
        message: 'Invalid Email!',
      });
    }
    return existedAccount;
  }
  public async checkRegisteredAccount(email: string, message: string) {
    const isAccountExist = await UserRedis.usersHaveRegisteredPFADD(email);

    if (!isAccountExist) {
      throw new ConflictException(message);
    }

    await this.checkAccountIfAlreadyExistThenThrowError({
      filterQuery: { email },
      message,
    });
  }

  // Handle functions

  async checkPasswordAndThrowError(password: string, hashedPassword: string) {
    const isMatchedPassword = await bcrypt.compare(password, hashedPassword);

    if (!isMatchedPassword) {
      throw new UnauthorizedException('Invalid Password');
    }
    return isMatchedPassword;
  }
}
