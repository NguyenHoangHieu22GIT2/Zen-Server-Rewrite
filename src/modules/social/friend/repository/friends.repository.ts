import { InjectModel } from '@nestjs/mongoose';
import { Friend } from '../entities/friend.entity';
import { Model, PipelineStage } from 'mongoose';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import {
  DocumentMongodbType,
  FriendAggregation,
} from 'src/common/types/mongodbTypes';
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
    let endUserFriend = await this.findOne({ endUserId: leaderId });
    let endUserFriend2 = await this.findOne({ endUserId: friendId });

    if (!endUserFriend) {
      endUserFriend = await this.create({
        endUserId: leaderId,
        endUserIds: [friendId],
      });
    } else {
      endUserFriend.endUserIds.push(friendId);
      await endUserFriend.save();
    }

    if (!endUserFriend2) {
      endUserFriend2 = await this.create({
        endUserId: friendId,
        endUserIds: [leaderId],
      });
    }

    return endUserFriend;
  }

  async removeFriend({
    leaderId,
    friendId,
  }: IFriendRepository['removeFriend']): Promise<
    DocumentMongodbType<Friend>[]
  > {
    return Promise.all([
      this.updateOne(
        { endUserId: leaderId },
        { $pull: { endUserIds: friendId } },
      ),
      this.updateOne(
        { endUserId: friendId },
        { $pull: { endUserIds: leaderId } },
      ),
    ]);
  }

  async getFriendsAggregation(
    pipelineStage: PipelineStage[],
  ): Promise<FriendAggregation[]> {
    const friends =
      await this.findByAggregation<FriendAggregation>(pipelineStage);

    return friends;
  }
}
