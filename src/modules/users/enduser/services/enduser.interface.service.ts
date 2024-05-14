import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId } from 'src/common/types/utilTypes';
import { EndUser } from '../entities';
import { ChangeInformationDto } from '../dto';

export const IEndUserServiceString = 'IEndUserService';

export interface IEndUserService {
  findById(endUserId: EndUserId): Promise<DocumentMongodbType<EndUser>>;

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
