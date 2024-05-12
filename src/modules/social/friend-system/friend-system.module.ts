import { Module } from '@nestjs/common';
import { FriendSystemController } from './friend-system.controller';
import { FriendModule } from '../friend/friend.module';
import { FriendRequestModule } from '../friend-request/friend-request.module';

@Module({
  controllers: [FriendSystemController],
  imports: [FriendModule, FriendRequestModule],
})
export class FriendSystemModule {}
