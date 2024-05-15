import { InjectModel } from '@nestjs/mongoose';
import { Friend } from '../entities/friend.entity';
import { Model, PipelineStage } from 'mongoose';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { FriendAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/social/friend.aggregation';
import { EndUserId } from 'src/common/types/utilTypes';

export type IFriendRepository = {
  isFriend: {
    leaderId: EndUserId;
    friendId: EndUserId;
  };
  getFriendsAggregation: PipelineStage[];
  removeFriend: {
    leaderId: EndUserId;
    friendId: EndUserId;
  };
  createFriend: {
    leaderId: EndUserId;
    friendId: EndUserId;
  };
};

export class FriendRepository extends GenericRepositoryMongodb<Friend> {
  constructor(
    @InjectModel(Friend.name) private readonly friendModel: Model<Friend>,
  ) {
    super(friendModel);
  }

  async createFriend({
    leaderId,
    friendId,
  }: IFriendRepository['createFriend']): Promise<DocumentMongodbType<Friend>> {
    return this.createMany([
      {
        leaderId: friendId,
        friendId: leaderId,
      },
      {
        leaderId: leaderId,
        friendId: friendId,
      },
    ]);
  }

  async removeFriend({
    leaderId,
    friendId,
  }: IFriendRepository['removeFriend']): Promise<DocumentMongodbType<Friend>> {
    await this.delete({
      leaderId: friendId,
      friendId: leaderId,
    });
    return this.delete({ leaderId, friendId });
  }

  async getFriendsAggregation(
    pipelineStage: PipelineStage[],
  ): Promise<FriendAggregation> {
    const friends = (
      await this.findByAggregation(pipelineStage)
    )[0] as FriendAggregation;

    return friends;
  }
}
