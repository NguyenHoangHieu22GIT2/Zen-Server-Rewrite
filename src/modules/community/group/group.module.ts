import { Module } from '@nestjs/common';
import { GroupServiceUnstable } from './services/unstable/group.unstable.service';
import { GroupController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './entities/group.entity';
import { GroupServiceStable } from './services';

@Module({
  controllers: [GroupController],
  providers: [GroupServiceUnstable, GroupServiceStable],
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
})
export class GroupModule {}
