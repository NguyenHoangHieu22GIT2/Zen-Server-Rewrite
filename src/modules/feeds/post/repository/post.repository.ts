import { Injectable } from '@nestjs/common';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { Post } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostRepository extends GenericRepositoryMongodb<Post> {
  constructor(@InjectModel(Post.name) private readonly PostModel: Model<Post>) {
    super(PostModel);
  }
}
