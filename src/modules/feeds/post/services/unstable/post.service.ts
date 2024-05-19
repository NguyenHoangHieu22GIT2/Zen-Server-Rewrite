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
import { PostRepository } from '../../repository/post.repository';
@Injectable()
@TryCatchDecorator()
export class PostService implements IPostService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly postRepository: PostRepository,
  ) {}

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

  public async findPost(findPostDto: IPostServiceArgs['findPost']) {
    const post = await this.postRepository.findPostAggregation(findPostDto);
    return post;
  }

  public async getUserPostsFromProfile({
    getUserPostsDto,
    endUserId,
  }: IPostServiceArgs['getUserPosts']) {
    const posts = await this.postRepository.getPostsAggregation({
      queryLimitSkip: getUserPostsDto,
      queryAggregation: [{ $match: { endUserId: endUserId } }],
    });
    return posts;
  }

  public async getUserPostsFromGroup({
    getUserPostsDto,
    endUserId,
  }: IPostServiceArgs['getUserPosts']) {
    const query: PipelineStage[] = [{ $match: { endUserId: endUserId } }];

    if (getUserPostsDto.groupId) {
      query[0]['$match'].groupId = getUserPostsDto.groupId;
    }

    const posts = await this.postRepository.getPostsAggregation({
      queryLimitSkip: getUserPostsDto,
      queryAggregation: query,
    });
    return posts;
  }

  public async getPostsAggregation({
    queryLimitSkip,
    pipelineStages,
  }: IPostServiceArgs['getPostsAggregation']) {
    return this.postRepository.getPostsAggregation({
      queryAggregation: pipelineStages,
      queryLimitSkip,
    });
  }

  public async getRecommendedPosts({
    queryLimitSkip,
    //TODO: will use endUserId when we have recommendation system.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endUserId,
  }: IPostServiceArgs['getRecommendedPost']) {
    const queryAggregation: PipelineStage[] = [];

    const posts = await this.postRepository.getPostsAggregation({
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
