import { Module } from '@nestjs/common';
import { GroupMembersController } from './group-members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupMember, GroupMemberSchema } from './entities/group-member.entity';
import {
  GroupMembersServiceStable,
  GroupMembersServiceUnstable,
} from './services';

@Module({
  controllers: [GroupMembersController],
  providers: [GroupMembersServiceUnstable, GroupMembersServiceStable],
  imports: [
    MongooseModule.forFeature([
      { name: GroupMember.name, schema: GroupMemberSchema },
    ]),
  ],
})
export class GroupMembersModule {}
