import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PipelineStage } from 'mongoose';
import { isIdsEqual } from 'src/common/utils/index';
import { TryCatchDecorator } from 'src/cores/decorators';
import { IPostService, IPostServiceArgs } from './post.interface';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { PostRepository } from '../repository/post.repository';
import { GroupId } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { PopulateEndUserAggregation } from 'src/common/types/mongodbTypes';
import { Post } from '../entities';

@Injectable()
@TryCatchDecorator()
export class PostService implements IPostService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly postRepository: PostRepository,
  ) {}

  public async getGroupPosts<T>({
    groupId,
    queryLimitSkip,
  }: {
    groupId: GroupId;
    queryLimitSkip: QueryLimitSkip;
  }): Promise<(PopulateEndUserAggregation<Post> & T)[]> {
    const groupPosts = await this.postRepository.getPostsAggregation<T>({
      queryLimitSkip,
      queryAggregation: [{ $match: { groupId: groupId } }],
    });
    return groupPosts;
  }

  async createPost({
    createPostDto,
    endUserId,
    imageNames,
  }: IPostServiceArgs['createPost']) {
    const createdPost = await this.postRepository.create({
      ...createPostDto,
      endUserId,
      images: imageNames,
    });
    return createdPost;
  }

  public async findPost<T>(
    findPostDto: IPostServiceArgs['findPost'],
  ): Promise<PopulateEndUserAggregation<Post> & T> {
    const post = await this.postRepository.findPostAggregation<T>(findPostDto);
    return post;
  }

  public async getUserPostsFromProfile<T>({
    queryLimitSkip,
    endUserId,
  }: IPostServiceArgs['getUserPosts']) {
    const posts = await this.postRepository.getPostsAggregation<T>({
      queryLimitSkip: queryLimitSkip,
      queryAggregation: [{ $match: { endUserId: endUserId } }],
    });
    return posts;
  }

  public async getUserPostsFromGroup<T>({
    endUserId,
    queryLimitSkip,
    groupId,
  }: IPostServiceArgs['getUserPostsFromGroup']) {
    const query: PipelineStage[] = [
      { $match: { endUserId: endUserId, groupId: groupId } },
    ];

    const posts = await this.postRepository.getPostsAggregation<T>({
      queryLimitSkip: queryLimitSkip,
      queryAggregation: query,
    });
    return posts;
  }

  public async getPostsAggregation<T>({
    queryLimitSkip,
    pipelineStages,
  }: IPostServiceArgs['getPostsAggregation']) {
    return this.postRepository.getPostsAggregation<T>({
      queryAggregation: pipelineStages,
      queryLimitSkip,
    });
  }

  public async getRecommendedPosts<T>({
    queryLimitSkip,
    //TODO: will use endUserId when we have recommendation system.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endUserId,
  }: IPostServiceArgs['getRecommendedPost']) {
    const queryAggregation: PipelineStage[] = [
      { $match: { groupId: { $exists: false } } },
      { $sort: { createdAt: -1 } },
    ];

    const posts = await this.postRepository.getPostsAggregation<T>({
      queryLimitSkip,
      queryAggregation,
    });

    return posts;
  }

  public async modifyPost({
    endUserId,
    modifyPostDto,
    images,
  }: IPostServiceArgs['modifyPost']) {
    const post = await this.postRepository.findById(modifyPostDto.postId);
    console.log('Post', post, modifyPostDto.postId);
    if (!post) {
      throw new BadRequestException('Post does not exist!');
    }

    if (!isIdsEqual(post.endUserId, endUserId)) {
      throw new UnauthorizedException('You are not authorized to do this!');
    }
    Object.assign(post, { ...modifyPostDto, images });
    await post.save();
    return post;
  }

  public async deletePost({
    postId,
    endUserId,
  }: IPostServiceArgs['deletePost']) {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new BadRequestException('Post does not exist!');
    }
    if (!isIdsEqual(post.endUserId, endUserId)) {
      throw new UnauthorizedException('You are not authorized to do this!');
    }

    await post.deleteOne();
    return post;
  }
}
