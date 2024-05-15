import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from './entities/friend.entity';
import { FriendRepository } from './repository/friends.repository';
import { FriendService, IFriendServiceString } from './services';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';

@Module({
  controllers: [FriendController],
  providers: [
    {
      provide: IFriendServiceString,
      useClass: FriendService,
    },

    { provide: BaseRepositoryName, useClass: FriendRepository },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]),
  ],
  exports: [
    {
      provide: IFriendServiceString,
      useClass: FriendService,
    },
  ],
})
export class FriendModule {}
