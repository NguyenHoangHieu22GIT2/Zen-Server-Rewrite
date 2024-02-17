import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/post.aggregation';
import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { checkAuthorized } from 'src/common/utils/checkAuthorized';
import { LookUpEndUserAggregate } from 'src/common/constants/lookup-enduser.aggregate';
import { GroupPost } from '../../entities/group-post.entity';
import { FindGroupPostDto } from '../../dto/find-group-post.dto';
import { CreateGroupPostDto } from '../../dto/create-group-post.dto';
import { ModifyGroupPostDto } from '../../dto/modify-group-post.dto';

@Injectable()
export class GroupPostServiceStable {
  constructor(
    @InjectModel(GroupPost.name) private readonly postModel: Model<GroupPost>,
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

  public async findPostAggregation(findPostDto: FindGroupPostDto) {
    const postsAggregation: PostAggregation[] = await this.postModel.aggregate([
      {
        $match: { _id: findPostDto.postId },
      },
      ...LookUpEndUserAggregate,
    ]);
    const postAggregation = postsAggregation[0];
    return postAggregation;
  }

  public async findPost(
    findPostDto: FindGroupPostDto,
  ): Promise<DocumentMongodbType<GroupPost>> {
    const post = await this.postModel.findById(findPostDto.postId);
    return post;
  }

  public async createPost({
    endUserId,
    createGroupPostDto,
    imageNames,
  }: {
    createGroupPostDto: CreateGroupPostDto;
    endUserId: EndUserId;
    imageNames: string[];
  }): Promise<DocumentMongodbType<GroupPost>> {
    const createdPost = await this.postModel.create({
      ...createGroupPostDto,
      endUserId,
      images: imageNames,
    });
    return createdPost;
  }

  public async modifyPost({
    endUserId,
    modifyGroupPostDto,
    images,
  }: {
    modifyGroupPostDto: ModifyGroupPostDto;
    endUserId: EndUserId;
    images: string[];
  }): Promise<DocumentMongodbType<GroupPost>> {
    const post = await this.findPost({
      postId: modifyGroupPostDto.postId,
    });

    checkAuthorized({
      userActionId: endUserId,
      userHasPostId: post.endUserId,
    });

    const modifiedPost = Object.assign(post, { ...modifyGroupPostDto, images });
    return modifiedPost.save();
  }

  public async deletePost({
    postId,
    endUserId,
  }: {
    endUserId: EndUserId;
    postId: PostId;
  }): Promise<DocumentMongodbType<GroupPost>> {
    const post = await this.findPost({ postId });

    checkAuthorized({
      userActionId: endUserId,
      userHasPostId: post.endUserId,
    });

    await post.deleteOne();
    return post;
  }
}
