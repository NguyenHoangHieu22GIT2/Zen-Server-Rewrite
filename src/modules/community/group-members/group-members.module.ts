import { Module } from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { GroupMembersController } from './group-members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupMember, GroupMemberSchema } from './entities/group-member.entity';

@Module({
  controllers: [GroupMembersController],
  providers: [GroupMembersService],
  imports: [
    MongooseModule.forFeature([
      { name: GroupMember.name, schema: GroupMemberSchema },
    ]),
  ],
})
export class GroupMembersModule {}
