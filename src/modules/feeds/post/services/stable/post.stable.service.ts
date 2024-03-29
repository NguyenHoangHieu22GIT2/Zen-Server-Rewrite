import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../../../post/entities/post.entity';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/feeds';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { LookUpEndUserAggregate } from 'src/common/constants/lookup-enduser.aggregate';
import {
  IPostServiceStable,
  IPostServiceStableArgs,
} from './post.stable.interface';

@Injectable()
export class PostServiceStable implements IPostServiceStable {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  public async getPostsAggregation({
    queryLimitSkip,
    queryAggregation,
  }: IPostServiceStableArgs['getPostsAggregation']) {
    const postsAggregation: PostAggregation[] = await this.postModel.aggregate([
      ...queryAggregation,
      {
        $limit: queryLimitSkip.limit,
      },
      { $skip: queryLimitSkip.skip },
      ...LookUpEndUserAggregate,
    ]);
    return postsAggregation;
  }

  public async findPostAggregation(
    findPostDto: IPostServiceStableArgs['findPostAggregation'],
  ) {
    const postsAggregation: PostAggregation[] = await this.postModel.aggregate([
      {
        $match: { _id: findPostDto.postId },
      },
      ...LookUpEndUserAggregate,
    ]);
    const postAggregation = postsAggregation[0];
    return postAggregation;
  }

  public async findPostById(
    findPostDto: IPostServiceStableArgs['findPostById'],
  ): Promise<DocumentMongodbType<Post>> {
    const post = await this.postModel.findById(findPostDto.postId);
    return post;
  }

  public async createPost({
    endUserId,
    createPostDto,
    imageNames,
  }: IPostServiceStableArgs['createPost']): Promise<DocumentMongodbType<Post>> {
    const createdPost = await this.postModel.create({
      ...createPostDto,
      endUserId,
      images: imageNames,
    });
    return createdPost;
  }
}
