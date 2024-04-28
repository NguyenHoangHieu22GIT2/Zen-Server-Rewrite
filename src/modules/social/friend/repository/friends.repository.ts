import { InjectModel } from '@nestjs/mongoose';
import { Friend } from '../entities/friend.entity';
import { Model } from 'mongoose';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';

export class FriendRepository extends GenericRepositoryMongodb<Friend> {
  constructor(
    @InjectModel(Friend.name) private readonly friendModel: Model<Friend>,
  ) {
    super(friendModel);
  }
}
