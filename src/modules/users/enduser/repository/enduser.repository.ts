import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EndUser } from '../entities';
import { Model } from 'mongoose';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';

@Injectable()
export class EndUserRepository extends GenericRepositoryMongodb<EndUser> {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {
    super(EndUserModel);
  }
}
