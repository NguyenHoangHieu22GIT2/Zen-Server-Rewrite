import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EndUser } from '../../entities/';
import { Model } from 'mongoose';
import { EndUserId } from 'src/common/types/utilTypes/';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';
@Injectable()
export class EnduserServiceStable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {}

  public async findById(
    endUserId: EndUserId,
  ): Promise<DocumentMongodbType<EndUser>> {
    const user = await this.EndUserModel.findById(endUserId);
    return user;
  }
}
