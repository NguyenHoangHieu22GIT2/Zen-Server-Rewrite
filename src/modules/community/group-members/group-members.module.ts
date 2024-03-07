import { Module } from '@nestjs/common';
import { GroupMembersController } from './group-members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupMember, GroupMemberSchema } from './entities/group-member.entity';
import {
  GroupMembersServiceStable,
  GroupMembersServiceUnstable,
} from './services';
import { IGroupMembersServiceStableString } from './services/stable/group-member.interface';
import { IGroupMembersServiceUnstableString } from './services/unstable/group-members.interface';

@Module({
  controllers: [GroupMembersController],
  providers: [
    {
      provide: IGroupMembersServiceStableString,
      useClass: GroupMembersServiceStable,
    },
    {
      provide: IGroupMembersServiceUnstableString,
      useClass: GroupMembersServiceUnstable,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: GroupMember.name, schema: GroupMemberSchema },
    ]),
  ],
  exports: [
    {
      provide: IGroupMembersServiceStableString,
      useClass: GroupMembersServiceStable,
    },
    {
      provide: IGroupMembersServiceUnstableString,
      useClass: GroupMembersServiceUnstable,
    },
  ],
})
export class GroupMembersModule {}
