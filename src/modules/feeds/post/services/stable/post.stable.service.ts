import { Inject, Injectable } from '@nestjs/common';
import { Post } from '../../../post/entities/post.entity';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/feeds';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { LookUpEndUserAggregate } from 'src/common/constants/lookup-enduser.aggregate';
import {
  IPostServiceStable,
  IPostServiceStableArgs,
} from './post.stable.interface';
import { PostId } from 'src/common/types/utilTypes';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { PostRepository } from '../../repository/post.repository';

@Injectable()
export class PostServiceStable implements IPostServiceStable {
  constructor(
    @Inject(BaseRepositoryName) private readonly postRepository: PostRepository,
  ) {}

  public async getPostsAggregation({
    queryLimitSkip,
    queryAggregation,
  }: IPostServiceStableArgs['getPostsAggregation']) {
    const postsAggregation: PostAggregation[] =
      await this.postRepository.findByAggregation([
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
    const postsAggregation: PostAggregation[] =
      await this.postRepository.findByAggregation([
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
    const post = await this.postRepository.findById(findPostDto.postId);
    return post;
  }

  public async createPost({
    endUserId,
    createPostDto,
    imageNames,
  }: IPostServiceStableArgs['createPost']): Promise<DocumentMongodbType<Post>> {
    const createdPost = await this.postRepository.create({
      ...createPostDto,
      endUserId,
      images: imageNames,
    });
    return createdPost;
  }

  savePost(postId: PostId, data: Partial<Post>): Promise<unknown> {
    return this.postRepository.update(postId, data);
  }

  deletePost(postId: PostId): Promise<unknown> {
    return this.postRepository.delete(postId);
  }
}
