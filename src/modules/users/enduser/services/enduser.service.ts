import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { EndUserId } from 'src/common/types/utilTypes/';
import {
  isImageTheRightType,
  createImageName,
  storeFile,
  removeFile,
  noObj,
} from 'src/common/utils/';

import { ChangeInformationDto } from '../dto';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { EndUserRepository } from '../repository/enduser.repository';
import { IEndUserService } from './enduser.interface.service';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { SearchUsersDto } from '../dto/search-users.dto';
import { EndUser } from '../entities';
import { QueryLimitSkip } from 'src/cores/global-dtos';

@Injectable()
export class EndUserService implements IEndUserService {
  private readonly loggerService: LoggerService = new Logger(
    EndUserService.name,
  );
  constructor(
    @Inject(BaseRepositoryName)
    private readonly endUserRepository: EndUserRepository,
  ) {}

  public async find(
    queryLimitSkip: QueryLimitSkip,
  ): Promise<DocumentMongodbType<EndUser>[]> {
    const endUsers = await this.endUserRepository.find(noObj, noObj, {
      limit: queryLimitSkip.limit,
      skip: queryLimitSkip.skip,
    });
    return endUsers;
  }

  public async searchByUsername(
    query: SearchUsersDto,
  ): Promise<DocumentMongodbType<EndUser>[]> {
    const endUsers = await this.endUserRepository.find(
      { username: { $regex: query.search, $options: 'i' } },
      noObj,
      { limit: query.limit, skip: query.skip },
    );
    return endUsers;
  }

  public async getEndUsersThroughIds(endUserIds: EndUserId[]) {
    const endUsers = await this.endUserRepository.find({
      _id: { $in: endUserIds },
    });
    return endUsers;
  }

  public async findById(userId: EndUserId) {
    const user = await this.endUserRepository.findById(userId);
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
    const user = await this.endUserRepository.findById(userId);
    await storeFile({ fileName, file });
    await removeFile(user.avatar);
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
    const user = await this.endUserRepository.findById(userId);
    Object.assign(user, changeInformationDto);
    return user.save();
  }
}
