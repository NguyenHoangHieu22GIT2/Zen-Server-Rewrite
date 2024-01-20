import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EndUser } from '../entities/enduser.entity';
import { Model } from 'mongoose';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { checkImageType } from 'src/common/utils/checkImageType';
import { createImageName } from 'src/common/utils/createImageName';
import { storeFile } from 'src/common/utils/storeFile';
import { deleteFile } from 'src/common/utils/removeFile';
import { EnduserServiceStable } from './enduser.stable.service';
@Injectable()
export class EnduserServiceUnstable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
    private readonly enduserServiceStable: EnduserServiceStable,
  ) {}

  public async changeAvatar({
    file,
    userId,
  }: {
    file: Express.Multer.File;
    userId: EndUserId;
  }) {
    checkImageType(file);
    const fileName = createImageName(file.originalname);
    const user = await this.enduserServiceStable.findById(userId);
    storeFile({ fileName, file });
    deleteFile(user.avatar);
    user.avatar = fileName;
    return user.save();
  }
}
