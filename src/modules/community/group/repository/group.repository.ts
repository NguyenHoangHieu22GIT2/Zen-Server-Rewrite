import { InjectModel } from '@nestjs/mongoose';
import { Group } from '../entities';
import { Model } from 'mongoose';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';

export class GroupRepository extends GenericRepositoryMongodb<Group> {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {
    super(groupModel);
  }
}
