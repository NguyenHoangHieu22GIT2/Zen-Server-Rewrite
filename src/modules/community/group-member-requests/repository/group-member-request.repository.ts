import { InjectModel } from '@nestjs/mongoose';

import { GroupMemberRequest } from '../entities/group-member-request.entity';
import { Model } from 'mongoose';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupMemberRequestRepository extends GenericRepositoryMongodb<GroupMemberRequest> {
  constructor(
    @InjectModel(GroupMemberRequest.name)
    private readonly groupMemberRequest: Model<GroupMemberRequest>,
  ) {
    super(groupMemberRequest);
  }
}
