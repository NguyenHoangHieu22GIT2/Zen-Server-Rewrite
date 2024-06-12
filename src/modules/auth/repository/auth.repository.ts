import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { EndUser } from 'src/modules/users/enduser';

export class AuthRepository extends GenericRepositoryMongodb<EndUser> {
  constructor(
    @InjectModel(EndUser.name) private readonly endUserModel: Model<EndUser>,
  ) {
    super(endUserModel);
  }
}
