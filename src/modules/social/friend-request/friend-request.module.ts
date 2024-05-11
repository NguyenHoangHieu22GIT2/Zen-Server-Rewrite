import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { FriendRequestRepository } from './repository/friend-request.repository';
import { IFriendRequestServiceString } from './friend-request.interface.service';
import { FriendModule } from '../friend/friend.module';

@Module({
  controllers: [FriendRequestController],
  providers: [
    {
      provide: IFriendRequestServiceString,
      useClass: FriendRequestService,
    },
    {
      provide: BaseRepositoryName,
      useClass: FriendRequestRepository,
    },
  ],
  imports: [FriendModule],
})
export class FriendRequestModule {}
