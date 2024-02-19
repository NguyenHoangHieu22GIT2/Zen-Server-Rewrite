import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EndUser } from '../../entities/enduser.entity';
import { Model } from 'mongoose';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { checkImageTypeToThrowError } from 'src/common/utils/checkImageTypeToThrowError';
import { createImageName } from 'src/common/utils/createImageName';
import { storeFile } from 'src/common/utils/storeFile';
import { removeFile } from 'src/common/utils/removeFile';
import { EnduserServiceStable } from '../stable/enduser.stable.service';
import { ChangeInformationDto } from '../../dto/change-information.dto';
@Injectable()
export class EnduserServiceUnstable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
    private readonly enduserServiceStable: EnduserServiceStable,
  ) {}

  public async findById(userId: EndUserId) {
    const user = await this.enduserServiceStable.findById(userId);
    return user;
  }

  public async changeAvatar({
    file,
    userId,
  }: {
    file: Express.Multer.File;
    userId: EndUserId;
  }) {
    checkImageTypeToThrowError(file);
    const fileName = createImageName(file.originalname);
    const user = await this.enduserServiceStable.findById(userId);
    storeFile({ fileName, file });
    removeFile(user.avatar);
    user.avatar = fileName;
    return user.save();
  }

  public async changeInformation({
    userId,
    changeInformationDto,
  }: {
    changeInformationDto: ChangeInformationDto;
    userId: EndUserId;
  }) {
    const user = await this.enduserServiceStable.findById(userId);
    Object.assign(user, changeInformationDto);
    return user.save();
  }
}
