import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

@Injectable()
export class AuthServiceStable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {}

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
}
