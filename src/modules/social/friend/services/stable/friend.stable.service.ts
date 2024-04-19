import { InjectModel } from '@nestjs/mongoose';
import { Friend } from '../../entities/friend.entity';
import { Model, PipelineStage } from 'mongoose';
import { IFriendStableService } from './friend.stable.interface';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId } from 'src/common/types/utilTypes';
import { FriendAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/social/friend.aggregation';

export class FriendStableService implements IFriendStableService {
  constructor(
    @InjectModel(Friend.name) private readonly friendModel: Model<Friend>,
  ) {}

  async createFriend(
    leaderId: EndUserId,
    endUserId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>> {
    const friend = await this.friendModel.findOneAndUpdate(
      { endUserId: leaderId },
      { $push: { friends: endUserId } },
    );
    return friend;
  }

  async removeFriend(
    leaderId: EndUserId,
    endUserId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>> {
    const friend = await this.friendModel.findOneAndUpdate(
      { endUserId: leaderId },
      { $pull: { friends: endUserId } },
    );
    return friend;
  }

  async getFriendsAggregation(
    pipelineStage: PipelineStage[],
  ): Promise<FriendAggregation> {
    const friends = (
      await this.friendModel.aggregate(pipelineStage)
    )[0] as FriendAggregation;

    return friends;
  }
}
