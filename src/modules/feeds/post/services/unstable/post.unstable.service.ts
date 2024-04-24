import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  public async getUserPostsFromProfile({
    getUserPostsDto,
    endUserId,
  }: IPostServiceUnstableArgs['getUserPosts']) {
    const posts = await this.postServiceStable.getPostsAggregation({
      queryLimitSkip: getUserPostsDto,
      queryAggregation: [{ $match: { endUserId: endUserId } }],
    });
    return posts;
  }

  public async getUserPostsFromGroup({
    getUserPostsDto,
    endUserId,
  }: IPostServiceUnstableArgs['getUserPosts']) {
    const query: PipelineStage[] = [{ $match: { endUserId: endUserId } }];

    if (getUserPostsDto.groupId) {
      query[0]['$match'].groupId = getUserPostsDto.groupId;
    }

    const posts = await this.postServiceStable.getPostsAggregation({
      queryLimitSkip: getUserPostsDto,
      queryAggregation: query,
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

    if (!post) {
      throw new BadRequestException('Post does not exist!');
    }

    if (!isIdsEqual(post.endUserId, endUserId)) {
      throw new UnauthorizedException('You are not authorized to do this!');
    }
    Object.assign(post, { ...modifyPostDto, images });
    await this.postServiceStable.savePost(post.id, post);
    return post;
  }

  public async deletePost({
    postId,
    endUserId,
  }: IPostServiceUnstableArgs['deletePost']) {
    const post = await this.postServiceStable.findPostById({
      postId,
    });
    if (!post) {
      throw new BadRequestException('Post does not exist!');
    }
    if (!isIdsEqual(post.endUserId, endUserId)) {
      throw new UnauthorizedException('You are not authorized to do this!');
    }

    await this.postServiceStable.deletePost(postId);
    return post;
  }
}
