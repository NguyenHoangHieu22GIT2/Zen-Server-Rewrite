import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';
import { EndUser } from 'src/modules/users/enduser/';
import { IAuthServiceStable } from './auth.stable.interface';
import { EndUserId } from 'src/common/types/utilTypes';

@Injectable()
export class AuthServiceStable implements IAuthServiceStable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {}

  public async create(
    accountInfo: Partial<EndUser>,
  ): Promise<DocumentMongodbType<EndUser>> {
    return this.EndUserModel.create(accountInfo);
  }

  // Checks
  async findAccountFilterQuery(
    filterQuery: FilterQuery<EndUser>,
  ): Promise<DocumentMongodbType<EndUser>> | undefined {
    const user = await this.EndUserModel.findOne(filterQuery);
    return user ? user : null;
  }

  public async findAccountById(
    endUserId: EndUserId,
  ): Promise<DocumentMongodbType<EndUser>> {
    return this.EndUserModel.findById(endUserId);
  }
}
