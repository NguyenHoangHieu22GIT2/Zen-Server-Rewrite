import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Post } from '../entities/post.entity';
import { FindPostDto } from '../dto/find-post.dto';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/post.aggregation';
import { getPostsDto } from '../dto/get-posts.dto';
import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { ModifyPostDto } from '../dto/modify-post.dto';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';

@Injectable()
export class PostServiceStable {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  private queryAggregation: PipelineStage[] = [
    {
      $lookup: {
        from: nameOfCollections.EndUser,
        localField: 'endUserId',
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

  public async getPostsAggregation(getPostsDto: getPostsDto) {
    const postsAggregation: PostAggregation[] = await this.postModel.aggregate([
      {
        $limit: getPostsDto.limit,
        $skip: getPostsDto.skip,
      },
      ...this.queryAggregation,
    ]);
    return postsAggregation;
  }
  public async findPostAggregation(findPostDto: FindPostDto) {
    const postsAggregation: PostAggregation[] = await this.postModel.aggregate([
      {
        $match: { _id: findPostDto.postId },
      },
      ...this.queryAggregation,
    ]);
    const postAggregation = postsAggregation[0];
    return postAggregation;
  }

  public async findPost(
    findPostDto: FindPostDto,
  ): Promise<DocumentMongodbType<Post>> {
    const post = await this.postModel.findById(findPostDto.postId);
    return post;
  }

  public async createPost({
    endUserId,
    createPostDto,
  }: {
    createPostDto: CreatePostDto;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Post>> {
    const createdPost = await this.postModel.create({
      ...createPostDto,
      endUserId,
    });
    return createdPost;
  }

  public async modifyPost({
    endUserId,
    modifyPostDto,
  }: {
    modifyPostDto: ModifyPostDto;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Post>> {
    const post = await this.findPost({ postId: modifyPostDto.postId });

    this.checkAuthorized({
      userActionId: endUserId,
      userHasPostId: post.endUserId,
    });

    // Do this so we don't need to keep changing if we add some new properties
    const { postId, ...modifiedData } = modifyPostDto;

    const modifiedPost = await this.postModel.findByIdAndUpdate(
      modifyPostDto.postId,
      modifiedData,
    );
    return modifiedPost;
  }

  public async deletePost({
    postId,
    endUserId,
  }: {
    endUserId: EndUserId;
    postId: PostId;
  }): Promise<DocumentMongodbType<Post>> {
    const post = await this.findPost({ postId });

    this.checkAuthorized({
      userActionId: endUserId,
      userHasPostId: post.endUserId,
    });

    await post.deleteOne();
    return post;
  }

  private checkAuthorized({
    userActionId,
    userHasPostId,
  }: {
    userActionId: EndUserId;
    userHasPostId: EndUserId;
  }) {
    if (!userHasPostId.equals(userActionId)) {
      throw new UnauthorizedException(
        "You don't have access to do this action!",
      );
    }
  }
}
