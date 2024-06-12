import { Injectable } from '@nestjs/common';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { Comment } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentRepository extends GenericRepositoryMongodb<Comment> {
  constructor(
    @InjectModel(Comment.name) private readonly CommentModel: Model<Comment>,
  ) {
    super(CommentModel);
  }
}
