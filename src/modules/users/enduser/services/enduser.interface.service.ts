import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId } from 'src/common/types/utilTypes';
import { EndUser } from '../entities';
import { ChangeInformationDto } from '../dto';
import { SearchUsersDto } from '../dto/search-users.dto';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export const IEndUserServiceString = 'IEndUserService';

export interface IEndUserService<T = EndUser> {
  getEndUsersThroughIds(
    endUserIds: EndUserId[],
  ): Promise<DocumentMongodbType<EndUser>[]>;

  findById(endUserId: EndUserId): Promise<DocumentMongodbType<T>>;

  find(queryLimitSkip: QueryLimitSkip): Promise<DocumentMongodbType<T>[]>;

  searchByUsername(query: SearchUsersDto): Promise<DocumentMongodbType<T>[]>;

  changeAvatar({
    file,
    userId,
  }: {
    file: Express.Multer.File;
    userId: EndUserId;
  }): Promise<DocumentMongodbType<EndUser>>;

  changeInformation({
    userId,
    changeInformationDto,
  }: {
    changeInformationDto: ChangeInformationDto;
    userId: EndUserId;
  }): Promise<DocumentMongodbType<EndUser>>;
}
