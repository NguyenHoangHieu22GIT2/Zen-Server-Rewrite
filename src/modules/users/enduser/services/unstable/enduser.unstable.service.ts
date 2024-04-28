import { Injectable } from '@nestjs/common';
import { EndUserId } from 'src/common/types/utilTypes/';
import {
  isImageTheRightType,
  createImageName,
  storeFile,
  removeFile,
} from 'src/common/utils/';

import { EnduserServiceStable } from '../stable/';
import { ChangeInformationDto } from '../../dto/';
@Injectable()
export class EnduserServiceUnstable {
  constructor(private readonly enduserServiceStable: EnduserServiceStable) {}

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
    isImageTheRightType(file);
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
