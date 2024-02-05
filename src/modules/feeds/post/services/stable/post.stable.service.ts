import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../../post/dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Post } from '../../../post/entities/post.entity';
import { FindPostDto } from '../../../post/dto/find-post.dto';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/post.aggregation';
import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { ModifyPostDto } from '../../../post/dto/modify-post.dto';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { checkAuthorized } from 'src/common/utils/checkAuthorized';

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
    queryAggregation,
  }: {
    queryLimitSkip: QueryLimitSkip;
    queryAggregation: PipelineStage[];
  }) {
    const postsAggregation: PostAggregation[] = await this.postModel.aggregate([
      ...queryAggregation,
      {
        $limit: queryLimitSkip.limit,
        $skip: queryLimitSkip.skip,
      },
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
    images,
  }: {
    modifyPostDto: ModifyPostDto;
    endUserId: EndUserId;
    images: string[];
  }): Promise<DocumentMongodbType<Post>> {
    const post = await this.findPost({ postId: modifyPostDto.postId });

    checkAuthorized({
      userActionId: endUserId,
      userHasPostId: post.endUserId,
    });

    //DEPRECATED: BECAUSE WE HAVE TO FIND AGAIN, THE
    // NEXT CODES IS FASTER BECAUSE WE JUST NEED TO SAVE

    // Do this so we don't need to keep changing if we add some new properties
    // const modifiedPost = await this.postModel.findByIdAndUpdate(
    //   modifyPostDto.postId,
    //   modifyPostDto,
    // );

    const modifiedPost = Object.assign(post, { ...modifyPostDto, images });
    return modifiedPost.save();
  }

  public async deletePost({
    postId,
    endUserId,
  }: {
    endUserId: EndUserId;
    postId: PostId;
  }): Promise<DocumentMongodbType<Post>> {
    const post = await this.findPost({ postId });

    checkAuthorized({
      userActionId: endUserId,
      userHasPostId: post.endUserId,
    });

    await post.deleteOne();
    return post;
  }
}
