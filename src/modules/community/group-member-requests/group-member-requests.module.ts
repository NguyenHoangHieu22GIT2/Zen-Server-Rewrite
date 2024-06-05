import { Module } from '@nestjs/common';
import { GroupMemberRequestsService } from './service/group-member-requests.service';
import { GroupMemberRequestsController } from './group-member-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GroupMemberRequest,
  GroupMemberRequestSchema,
} from './entities/group-member-request.entity';
import { GroupMemberRequestRepository } from './repository/group-member-request.repository';

@Module({
  controllers: [GroupMemberRequestsController],
  providers: [GroupMemberRequestsService, GroupMemberRequestRepository],
  imports: [
    MongooseModule.forFeature([
      { name: GroupMemberRequest.name, schema: GroupMemberRequestSchema },
    ]),
  ],
})
export class GroupMemberRequestsModule {}
