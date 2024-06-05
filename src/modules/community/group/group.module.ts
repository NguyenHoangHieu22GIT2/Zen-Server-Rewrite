import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './entities/group.entity';
import { GroupService, IGroupServiceString } from './services';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { GroupRepository } from './repository/group.repository';

@Module({
  controllers: [GroupController],
  providers: [
    { provide: IGroupServiceString, useClass: GroupService },
    { provide: BaseRepositoryName, useClass: GroupRepository },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  exports: [{ provide: IGroupServiceString, useClass: GroupService }],
})
export class GroupModule {}
