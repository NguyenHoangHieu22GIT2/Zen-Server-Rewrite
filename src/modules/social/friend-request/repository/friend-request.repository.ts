import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { FriendRequest } from '../entities/friend-request.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendRequestRepository extends GenericRepositoryMongodb<FriendRequest> {
  constructor(
    @InjectModel(FriendRequest.name)
    private readonly FriendRequestModel: Model<FriendRequest>,
  ) {
    super(FriendRequestModel);
  }
}
