import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GroupPost } from '../../entities/group-post.entity';
import { Model, PipelineStage } from 'mongoose';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { GroupPostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/community/community';
import { LookUpEndUserAggregate } from 'src/common/constants/lookup-enduser.aggregate';
import { FindGroupPostDto } from '../../dto/find-group-post.dto';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { CreateGroupPostDto } from '../../dto/create-group-post.dto';
import { EndUserId } from 'src/common/types/utilTypes/Brand';

@Injectable()
export class GroupPostServiceStable {
  constructor(
    @InjectModel(GroupPost.name) private readonly postModel: Model<GroupPost>,
  ) {}

  public async getGroupPostsAggregation({
    queryLimitSkip,
    queryAggregation,
  }: {
    queryLimitSkip: QueryLimitSkip;
    queryAggregation: PipelineStage[];
  }) {
    const postsAggregation: GroupPostAggregation[] =
      await this.postModel.aggregate([
        ...queryAggregation,
        {
          $limit: queryLimitSkip.limit,
        },
        { $skip: queryLimitSkip.skip },
        ...LookUpEndUserAggregate,
      ]);
    return postsAggregation;
  }

  public async findPostAggregation(findGroupPostDto: FindGroupPostDto) {
    const postsAggregation: GroupPostAggregation[] =
      await this.postModel.aggregate([
        {
          $match: { _id: findGroupPostDto.groupPostId },
        },
        ...LookUpEndUserAggregate,
      ]);
    const postAggregation = postsAggregation[0];
    return postAggregation;
  }

  public async findPostById(
    findPostDto: FindGroupPostDto,
  ): Promise<DocumentMongodbType<GroupPost>> {
    const post = await this.postModel.findById(findPostDto.groupPostId);
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
}
