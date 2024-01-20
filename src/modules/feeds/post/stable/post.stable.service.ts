import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Post } from '../entities/post.entity';
import { FindPostDto } from '../dto/find-post.dto';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/post.aggregation';
import { getPostsDto } from '../dto/get-posts.dto';
import { EndUserId } from 'src/common/types/utilTypes/Brand';

@Injectable()
export class PostServiceStable {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  private queryAggregation: PipelineStage[] = [
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
  ];

  public async getPosts(getPostsDto: getPostsDto) {
    const postsAggregation: PostAggregation[] = await this.postModel.aggregate([
      {
        $limit: getPostsDto.limit,
        $skip: getPostsDto.skip,
      },
      ...this.queryAggregation,
    ]);
    return postsAggregation;
  }
  public async findPost(findPostDto: FindPostDto) {
    const postsAggregation: PostAggregation[] = await this.postModel.aggregate([
      {
        $match: { _id: findPostDto.postId },
      },
      ...this.queryAggregation,
    ]);
    const postAggregation = postsAggregation[0];
    return postAggregation;
  }

  public async createPost({
    userId,
    createPostDto,
  }: {
    createPostDto: CreatePostDto;
    userId: EndUserId;
  }) {
    const createdPost = await this.postModel.create({
      ...createPostDto,
      userId,
    });
    return createdPost;
  }
}
