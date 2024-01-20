import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../entities/post.entity';
import { FindPostDto } from '../dto/find-post.dto';
import { nameOfCollections } from 'src/common/constants/name-of-collections';

@Injectable()
export class PostServiceStable {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  public async findPost(findPostDto: FindPostDto) {
    const post = await this.postModel.aggregate([
      {
        $match: { _id: findPostDto.postId },
      },
      {
        $lookup: {
          from: nameOfCollections.EndUser,
          localField: 'userId',
          foreignField: '_id',
          as: 'userFull',
        },
      },
      {
        $set: {
          user: {
            _id: '$userFull._id',
            username: '$userFull.username',
            avatar: '$userFull.avatar',
          },
        },
      },
      {
        $unset: ['$userFull'],
      },
    ]);
    return post;
  }
}
