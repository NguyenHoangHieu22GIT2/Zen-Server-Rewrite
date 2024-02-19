import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../../post/dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Post } from '../../../post/entities/post.entity';
import { FindPostDto } from '../../../post/dto/find-post.dto';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/feeds';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { LookUpEndUserAggregate } from 'src/common/constants/lookup-enduser.aggregate';

@Injectable()
export class PostServiceStable {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  public async getPostsAggregation({
    queryLimitSkip,
    queryAggregation,
  }: {
    queryLimitSkip: QueryLimitSkip;
    queryAggregation: PipelineStage[];
  }) {
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

  public async findPostAggregation(findPostDto: FindPostDto) {
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
    findPostDto: FindPostDto,
  ): Promise<DocumentMongodbType<Post>> {
    const post = await this.postModel.findById(findPostDto.postId);
    return post;
  }

  public async createPost({
    endUserId,
    createPostDto,
    imageNames,
  }: {
    createPostDto: CreatePostDto;
    endUserId: EndUserId;
    imageNames: string[];
  }): Promise<DocumentMongodbType<Post>> {
    const createdPost = await this.postModel.create({
      ...createPostDto,
      endUserId,
      images: imageNames,
    });
    return createdPost;
  }
}
