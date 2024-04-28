import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from '../entities';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { Model } from 'mongoose';

@Injectable()
export class LikeRepository extends GenericRepositoryMongodb<Like> {
  constructor(@InjectModel(Like.name) private readonly LikeModel: Model<Like>) {
    super(LikeModel);
  }
}
