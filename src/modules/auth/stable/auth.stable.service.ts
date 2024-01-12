import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

@Injectable()
export class AuthServiceStable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {}

  private async checkAccountIfAlreadyExist(
    email: string,
  ): Promise<DocumentMongodbType<EndUser>> | null {
    const user = await this.EndUserModel.findOne({ email });
    return user ? user : null;
  }

  public async checkAccountIfAlreadyExistThenThrowError({
    email,
    message,
  }: {
    email: string;
    message: string;
  }) {
    const user = await this.checkAccountIfAlreadyExist(email);
    if (user) {
      throw new ConflictException(message);
    }
    return user ? user : null;
  }

  public async checkAccountIfNotExistThenThrowError({
    email,
    message,
  }: {
    email: string;
    message: string;
  }) {
    const user = await this.checkAccountIfAlreadyExist(email);
    if (!user) {
      throw new NotFoundException(message);
    }
    return user;
  }

  async findAccountById(id: Types.ObjectId) {
    return this.EndUserModel.findById(id);
  }
}
