import { Friend } from '../../entities/friend.entity';
import { PipelineStage } from 'mongoose';
import {
  IFriendStableService,
  IFriendStableServiceArgs,
} from './friend.stable.interface';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { FriendAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/social/friend.aggregation';
import { FriendRepository } from '../../repository/friends.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendStableService implements IFriendStableService {
  constructor(private readonly friendRepository: FriendRepository) {}

  async createFriend({
    leaderId,
    friendId,
  }: IFriendStableServiceArgs['createFriend']): Promise<
    DocumentMongodbType<Friend>
  > {
    return this.friendRepository.createMany([
      {
        leaderId: friendId,
        friendId: leaderId,
      },
      {
        leaderId,
        friendId,
      },
    ]);
  }

  async removeFriend({
    leaderId,
    friendId,
  }: IFriendStableServiceArgs['removeFriend']): Promise<
    DocumentMongodbType<Friend>
  > {
    await this.friendRepository.delete({
      leaderId: friendId,
      friendId: leaderId,
    });
    return this.friendRepository.delete({ leaderId, friendId });
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
