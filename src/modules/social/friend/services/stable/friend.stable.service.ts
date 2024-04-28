import { Friend } from '../../entities/friend.entity';
import { PipelineStage } from 'mongoose';
import {
  IFriendStableService,
  IFriendStableServiceArgs,
} from './friend.stable.interface';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { FriendAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/social/friend.aggregation';
import { FriendRepository } from '../../repository/friends.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FriendStableService implements IFriendStableService {
  constructor(private readonly friendRepository: FriendRepository) {}

  private async isFriend({
    leaderId,
    endUserId,
  }: IFriendStableServiceArgs['isFriend']): Promise<boolean> {
    const friendDocument = await this.friendRepository.findOne({
      endUserId: leaderId,
    });

    return (
      friendDocument.friends.findIndex(
        (friendId) => friendId.toString() === endUserId.toString(),
      ) != -1
    );
  }

  async createFriend({
    leaderId,
    endUserId,
  }: IFriendStableServiceArgs['createFriend']): Promise<
    DocumentMongodbType<Friend>
  > {
    const hasBeenFriend = await this.isFriend({ leaderId, endUserId });

    if (hasBeenFriend) {
      throw new BadRequestException('You already be friend with this user!');
    }

    const friend = await this.friendRepository.updateOne(
      { endUserId: leaderId },
      {
        $push: { friends: endUserId },
      },
    );
    return friend;
  }

  async removeFriend({
    leaderId,
    endUserId,
  }: IFriendStableServiceArgs['removeFriend']): Promise<
    DocumentMongodbType<Friend>
  > {
    const hasBeenFriend = await this.isFriend({ leaderId, endUserId });
    if (!hasBeenFriend) {
      throw new BadRequestException('You are not their friend to remove!');
    }

    const friend = await this.friendRepository.updateOne(
      { endUserId: leaderId },
      {
        $pull: { friends: endUserId },
      },
    );
    return friend;
  }

  async getFriendsAggregation(
    pipelineStage: PipelineStage[],
  ): Promise<FriendAggregation> {
    const friends = (
      await this.friendRepository.findByAggregation(pipelineStage)
    )[0] as FriendAggregation;

    return friends;
  }
}
