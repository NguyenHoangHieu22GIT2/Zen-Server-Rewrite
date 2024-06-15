import { Module } from '@nestjs/common';
import { GroupMembersController } from './group-members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupMember, GroupMemberSchema } from './entities/group-member.entity';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { GroupMembersRepository } from './repository/group-members.repository';
import { IGroupMembersServiceString } from './services/group-members.interface';
import { GroupMembersService } from './services';
import { Group, GroupSchema } from '../group/entities';

@Module({
  controllers: [GroupMembersController],
  providers: [
    {
      provide: IGroupMembersServiceString,
      useClass: GroupMembersService,
    },
    {
      provide: BaseRepositoryName,
      useClass: GroupMembersRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: GroupMember.name, schema: GroupMemberSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  exports: [
    {
      provide: IGroupMembersServiceString,
      useClass: GroupMembersService,
    },
  ],
})
export class GroupMembersModule {}
