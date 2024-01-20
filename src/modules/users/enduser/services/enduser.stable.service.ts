import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EndUser } from '../entities/enduser.entity';
import { Model, Types } from 'mongoose';
import { checkImageType } from 'src/common/utils/checkImageType';
import { createImageName } from 'src/common/utils/createImageName';
import { storeFile } from 'src/common/utils/storeFile';
import { deleteFile } from 'src/common/utils/removeFile';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { ChangeInformationDto } from '../dto/change-information.dto';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
@Injectable()
export class EnduserServiceStable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {}

  public async findById(
    userId: Types.ObjectId,
  ): Promise<DocumentMongodbType<EndUser>> {
    const user = await this.EndUserModel.findById(userId);
    return user;
  }

  public async changeInformation({
    userId,
    changeInformationDto,
  }: {
    changeInformationDto: ChangeInformationDto;
    userId: EndUserId;
  }) {
    const user = await this.findById(userId);
    Object.assign(user, changeInformationDto);
    return user.save();
  }
}
