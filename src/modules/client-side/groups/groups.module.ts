import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { EventModule } from 'src/modules/community/event';
import { GroupModule } from 'src/modules/community/group';
import { GroupMembersModule } from 'src/modules/community/group-members';

@Module({
  controllers: [GroupsController],
  imports: [EventModule, GroupModule, GroupMembersModule],
})
export class GroupsModule {}
