import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';
import { EndUser } from 'src/modules/users/enduser/';
import * as bcrypt from 'bcryptjs';
import { LoginEndUserDto } from '../dto/';

@Injectable()
export class AuthServiceStable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {}

  public async create(
    accountInfo: Partial<EndUser>,
  ): Promise<DocumentMongodbType<EndUser>> {
    return this.EndUserModel.create(accountInfo);
  }

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
  }): Promise<DocumentMongodbType<EndUser>> {
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
  }): Promise<DocumentMongodbType<EndUser>> {
    const user = await this.checkAccountIfAlreadyExist(filterQuery);
    if (!user) {
      throw new UnauthorizedException(message);
    }
    return user;
  }

  public async findAccountById(
    _id: Types.ObjectId,
  ): Promise<DocumentMongodbType<EndUser>> {
    return this.checkAccountIfAlreadyExist({ _id });
  }

  public async checkLoginAccount(
    loginEndUserDto: LoginEndUserDto,
  ): Promise<EndUser | DocumentMongodbType<EndUser>> {
    const existedAccount = await this.checkAccountIfNotExistThenThrowError({
      filterQuery: { email: loginEndUserDto.email },
      message: 'Invalid Email!',
    });
    return existedAccount;
  }
  public async checkRegisteredAccount(email: string, message: string) {
    await this.checkAccountIfAlreadyExistThenThrowError({
      filterQuery: { email },
      message,
    });
  }

  // Handle functions

  async checkPasswordAndThrowErrorIfNotMatch(
    password: string,
    hashedPassword: string,
  ) {
    const isMatchedPassword = await bcrypt.compare(password, hashedPassword);

    if (!isMatchedPassword) {
      throw new UnauthorizedException('Invalid Password');
    }
    return isMatchedPassword;
  }
}
