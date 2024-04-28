import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from './entities/friend.entity';
import { IFriendUnstableServiceString } from './services/unstable/friend.unstable.interface';
import { FriendUnstableService } from './services/unstable/friend.unstable.service';
import { FriendStableService } from './services/stable/friend.stable.service';
import { IFriendStableServiceString } from './services/stable/friend.stable.interface';
import { FriendRepository } from './repository/friends.repository';

@Module({
  controllers: [FriendController],
  providers: [
    {
      provide: IFriendUnstableServiceString,
      useClass: FriendUnstableService,
    },
    {
      provide: IFriendStableServiceString,
      useClass: FriendStableService,
    },
    FriendRepository,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]),
  ],
})
export class FriendModule {}
