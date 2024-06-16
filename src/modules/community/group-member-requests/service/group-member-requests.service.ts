import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IGroupMemberRequests } from './group-member-requests.interface';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { GroupMemberRequestRepository } from '../repository/group-member-request.repository';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { GroupMemberRequest } from '../entities/group-member-request.entity';
import { TryCatchDecorator } from 'src/cores/decorators';
import { Group } from '../../group/entities';

@Injectable()
@TryCatchDecorator()
export class GroupMemberRequestsService implements IGroupMemberRequests {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly groupMemberRequestRepository: GroupMemberRequestRepository,
  ) {}

  public async createRequest(
    endUserId: EndUserId,
    groupId: GroupId,
  ): Promise<DocumentMongodbType<GroupMemberRequest>> {
    const createRequest = await this.groupMemberRequestRepository.create({
      endUserId,
      groupId,
    });
    return createRequest;
  }

  public async acceptRequest(
    hostId: EndUserId,
    endUserId: EndUserId,
    group: Group,
  ): Promise<DocumentMongodbType<GroupMemberRequest>> {
    if (!group.endUserId.equals(hostId)) {
      throw new UnauthorizedException('You can not do this action!');
    }

    const request = await this.groupMemberRequestRepository.findOne({
      endUserId,
      groupId: group._id,
    });

    request.state = 'accepted';

    return request.save();
  }

  public async declineRequest(
    hostId: EndUserId,
    endUserId: EndUserId,
    group: Group,
  ): Promise<DocumentMongodbType<GroupMemberRequest>> {
    if (!group.endUserId.equals(hostId)) {
      throw new UnauthorizedException('You can not do this action!');
    }

    const request = await this.groupMemberRequestRepository.findOne({
      endUserId,
      groupId: group._id,
    });

    await request.deleteOne();

    return request;
  }

  public async getRequests(
    hostId: EndUserId,
    group: Group,
  ): Promise<DocumentMongodbType<GroupMemberRequest>[]> {
    if (!group.endUserId.equals(hostId)) {
      throw new UnauthorizedException('You can not do this action!');
    }

    const requests = await this.groupMemberRequestRepository.find({
      groupId: group._id,
    });
    for (let i = 0; i < requests.length; i++) {
      await requests[i].populate('endUserId');
    }

    return requests;
  }
}
