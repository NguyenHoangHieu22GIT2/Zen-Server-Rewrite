import { Injectable } from '@nestjs/common';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { Post } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { LookUpEndUserAggregate } from 'src/cores/mongodb-aggregations';
import { EndUserId } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { CreatePostDto, FindPostDto } from '../dto';
import { PopulateEndUserAggregation } from 'src/common/types/mongodbTypes';

export type Args = {
  getPostsAggregation: {
    queryLimitSkip: QueryLimitSkip;
    queryAggregation: PipelineStage[];
  };
  findPostAggregation: FindPostDto;
  findPostById: FindPostDto;
  createPost: {
    createPostDto: CreatePostDto;
    endUserId: EndUserId;
    imageNames: string[];
  };
};

@Injectable()
export class PostRepository extends GenericRepositoryMongodb<Post> {
  constructor(@InjectModel(Post.name) private readonly PostModel: Model<Post>) {
    super(PostModel);
  }

  public async getPostsAggregation<T>({
    queryLimitSkip,
    queryAggregation,
  }: Args['getPostsAggregation']) {
    const postsAggregation: (PopulateEndUserAggregation<Post> & T)[] =
      await this.findByAggregation([
        ...queryAggregation,
        {
          $limit: queryLimitSkip.limit,
        },
        { $skip: queryLimitSkip.skip },
        ...LookUpEndUserAggregate,
      ]);
    return postsAggregation;
  }

  public async findPostAggregation<T>(
    findPostDto: Args['findPostAggregation'],
  ) {
    const postsAggregation: (PopulateEndUserAggregation<Post> & T)[] =
      await this.findByAggregation([
        {
          $match: { _id: findPostDto.postId },
        },
        ...LookUpEndUserAggregate,
      ]);
    const postAggregation = postsAggregation[0];
    return postAggregation;
  }
}
