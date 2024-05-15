import { Module } from '@nestjs/common';
import { FriendRequestService } from './services/friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { FriendRequestRepository } from './repository/friend-request.repository';
import { IFriendRequestServiceString } from './services/friend-request.interface.service';
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
    MongooseModule.forFeature([
      { name: FriendRequest.name, schema: FriendRequestSchema },
    ]),
  ],
  exports: [
    {
      provide: IFriendRequestServiceString,
      useClass: FriendRequestService,
    },
  ],
})
export class FriendRequestModule {}
