import { Module } from '@nestjs/common';
import { GroupServiceUnstable } from './services/unstable/group.unstable.service';
import { GroupController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './entities/group.entity';
import { GroupServiceStable, IGroupServiceUnstableString } from './services';
import { IGroupServiceStableString } from './services/stable/group.stable.interface';

@Module({
  controllers: [GroupController],
  providers: [
    { provide: IGroupServiceUnstableString, useClass: GroupServiceUnstable },
    { provide: IGroupServiceStableString, useClass: GroupServiceStable },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  exports: [
    { provide: IGroupServiceUnstableString, useClass: GroupServiceUnstable },
  ],
})
export class GroupModule {}
