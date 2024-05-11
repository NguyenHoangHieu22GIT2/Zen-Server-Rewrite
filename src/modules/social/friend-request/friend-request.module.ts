import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { FriendRequestRepository } from './repository/friend-request.repository';
import { IFriendRequestServiceString } from './friend-request.interface.service';
import { FriendModule } from '../friend/friend.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FriendRequest,
  FriendRequestSchema,
} from './entities/friend-request.entity';

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
  imports: [
    FriendModule,
    MongooseModule.forFeature([
      { name: FriendRequest.name, schema: FriendRequestSchema },
    ]),
  ],
})
export class FriendRequestModule {}
