import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EndUser } from '../entities/enduser.entity';
import { Model, Types } from 'mongoose';
import { checkImageType } from 'src/common/utils/checkImageType';
import { createImageName } from 'src/common/utils/createImageName';
import { storeFile } from 'src/common/utils/storeFile';
import { deleteFile } from 'src/common/utils/removeFile';
@Injectable()
export class EnduserServiceStable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {}

  public async findById(userId: Types.ObjectId) {
    const user = await this.EndUserModel.findById(userId);
    return user;
  }

  public async changeAvatar({
    file,
    userId,
  }: {
    file: Express.Multer.File;
    userId: Types.ObjectId;
  }) {
    checkImageType(file);
    const fileName = createImageName(file.originalname);
    const user = await this.EndUserModel.findById(userId);
    storeFile({ fileName, file });
    deleteFile(user.avatar);
    user.avatar = fileName;
    return user.save();
  }

  public changeUsername({
    userId,
    username,
  }: {
    userId: string;
    username: string;
  }) {
    return this.EndUserModel.findByIdAndUpdate(userId, { $set: { username } });
  }

  public changeGender({ userId, gender }: { userId: string; gender: string }) {
    return this.EndUserModel.findByIdAndUpdate(userId, { $set: { gender } });
  }
}
