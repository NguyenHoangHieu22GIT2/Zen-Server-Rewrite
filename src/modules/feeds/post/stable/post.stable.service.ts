import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Post } from '../entities/post.entity';
import { FindPostDto } from '../dto/find-post.dto';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/post.aggregation';
import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { ModifyPostDto } from '../dto/modify-post.dto';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';

@Injectable()
export class PostServiceStable {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  private lookupUserAggregation: PipelineStage[] = [
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

  public async getPostsAggregation({
    queryLimitSkip,
    //TODO: endUserId will be used to filter out which post that user should see
    queryAggregation,
  }: {
    queryLimitSkip: QueryLimitSkip;
    queryAggregation: PipelineStage[];
  }) {
    const postsAggregation: PostAggregation[] = await this.postModel.aggregate([
      {
        $limit: queryLimitSkip.limit,
        $skip: queryLimitSkip.skip,
      },
      ...queryAggregation,
      ...this.lookupUserAggregation,
    ]);
    return postsAggregation;
  }
  public async findPostAggregation(findPostDto: FindPostDto) {
    const postsAggregation: PostAggregation[] = await this.postModel.aggregate([
      {
        $match: { _id: findPostDto.postId },
      },
      ...this.lookupUserAggregation,
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

    const modifiedPost = await this.postModel.findByIdAndUpdate(
      modifyPostDto.postId,
      modifyPostDto,
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
