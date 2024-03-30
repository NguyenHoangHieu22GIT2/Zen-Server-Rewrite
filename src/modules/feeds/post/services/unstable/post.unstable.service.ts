import { Inject, Injectable } from '@nestjs/common';
import { PipelineStage } from 'mongoose';
import { isIdsEqual } from 'src/common/utils/index';
import { TryCatchDecorator } from 'src/cores/decorators';
import {
  IPostServiceUnstable,
  IPostServiceUnstableArgs,
} from './post.unstable.interface';
import {
  IPostServiceStable,
  IPostServiceStableString,
} from '../stable/post.stable.interface';

@Injectable()
@TryCatchDecorator()
export class PostServiceUnstable implements IPostServiceUnstable {
  constructor(
    @Inject(IPostServiceStableString)
    private readonly postServiceStable: IPostServiceStable,
  ) {}

  async createPost({
    createPostDto,
    endUserId,
    imageNames,
  }: IPostServiceUnstableArgs['createPost']) {
    const createdPost = await this.postServiceStable.createPost({
      createPostDto,
      endUserId,
      imageNames,
    });
    return createdPost;
  }

  public async findPost(findPostDto: IPostServiceUnstableArgs['findPost']) {
    const post = await this.postServiceStable.findPostAggregation(findPostDto);
    return post;
  }

  public async getUserPosts({
    endUserId,
    getUserPostsDto,
  }: IPostServiceUnstableArgs['getUserPosts']) {
    const posts = await this.postServiceStable.getPostsAggregation({
      queryLimitSkip: getUserPostsDto,
      queryAggregation: [{ $match: { endUserId } }],
    });
    return posts;
  }

  public async getPostsAggregation({
    queryLimitSkip,
    pipelineStages,
  }: IPostServiceUnstableArgs['getPostsAggregation']) {
    return this.postServiceStable.getPostsAggregation({
      queryAggregation: pipelineStages,
      queryLimitSkip,
    });
  }

  public async getRecommendedPosts({
    queryLimitSkip,
    //TODO: will use endUserId when we have recommendation system.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endUserId,
  }: IPostServiceUnstableArgs['getRecommendedPost']) {
    const queryAggregation: PipelineStage[] = [];

    const posts = await this.postServiceStable.getPostsAggregation({
      queryLimitSkip,
      queryAggregation,
    });

    return posts;
  }

  public async modifyPost({
    endUserId,
    modifyPostDto,
    images,
  }: IPostServiceUnstableArgs['modifyPost']) {
    const post = await this.postServiceStable.findPostById({
      postId: modifyPostDto.postId,
    });
    isIdsEqual(post.endUserId, endUserId);
    Object.assign(post, { ...modifyPostDto, images });
    return post.save();
  }

  public async deletePost({
    postId,
    endUserId,
  }: IPostServiceUnstableArgs['deletePost']) {
    const post = await this.postServiceStable.findPostById({
      postId,
    });
    isIdsEqual(post.endUserId, endUserId);

    await post.deleteOne();
    return post;
  }
}
