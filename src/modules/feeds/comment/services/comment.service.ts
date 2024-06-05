import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LookUpEndUserAggregate } from 'src/cores/mongodb-aggregations';
import {
  ModifyCommentDto,
  GetCommentsDto,
  FindCommentDto,
  CreateCommentDto,
} from '../dto/';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';
import { TcommentsLookUpEndUser } from '../types/comment.type';
import { EndUserId } from 'src/common/types/utilTypes/';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';
import { Comment } from '../entities/';
import { TryCatchDecorator } from 'src/cores/decorators';
import { ICommentService } from './comment.interface';
import { isIdsEqual } from 'src/common/utils';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
@TryCatchDecorator()
export class CommentService implements ICommentService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly commentRepository: CommentRepository,
  ) {}

  async getComments(getCommentsDto: GetCommentsDto) {
    const comments: TcommentsLookUpEndUser =
      (await this.commentRepository.findByAggregation([
        {
          $match: {
            postId: getCommentsDto.postId,
            parentCommentId: getCommentsDto.parentCommentId,
          },
        },
        {
          $skip: getCommentsDto.skip,
        },
        { $limit: getCommentsDto.limit },
        {
          $lookup: {
            from: 'comments',
            let: { commentId: '$_id' },
            pipeline: [
              {
                $match: { $expr: { $eq: ['$parentCommentId', '$$commentId'] } },
              },
              { $limit: 1 },
            ],
            as: 'hasReplies',
          },
        },
        {
          $addFields: {
            hasReplies: { $gt: [{ $size: '$hasReplies' }, 0] },
          },
        },
        ...LookUpEndUserAggregate,
      ])) as (Comment & { endUser: userMinimalType })[];

    return comments;
  }

  async findComment(findCommentDto: FindCommentDto) {
    //@ts-expect-error I will fix this later...
    const comment: TcommentsLookUpEndUser[0] =
      await this.commentRepository.findByAggregation<
        Comment & { endUser: userMinimalType }
      >([
        { $match: { _id: findCommentDto.commentId } },
        ...LookUpEndUserAggregate,
      ]);

    return comment;
  }

  async createComment({
    endUserId,
    createCommentDto,
  }: {
    createCommentDto: CreateCommentDto;
    endUserId: EndUserId;
  }) {
    const comment = await this.commentRepository.create({
      endUserId,
      content: createCommentDto.content,
      parentCommentId: createCommentDto.parentCommentId,
      postId: createCommentDto.postId,
    });
    return comment;
  }

  async modifyComment({
    endUserId,
    modifyCommentDto,
  }: {
    modifyCommentDto: ModifyCommentDto;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Comment>> {
    const comment = await this.commentRepository.findById(
      modifyCommentDto.commentId,
    );
    if (!comment.endUserId.equals(endUserId)) {
      throw new UnauthorizedException(
        "You can not modify this comment because it isn't yours",
      );
    }
    comment.content = modifyCommentDto.content;
    await this.commentRepository.save(comment);
    return comment;
  }

  async deleteComment({
    endUserId,
    findCommentDto,
  }: {
    findCommentDto: FindCommentDto;
    endUserId: EndUserId;
  }) {
    const commentId = findCommentDto.commentId;
    const comment = await this.commentRepository.findById(commentId);
    if (!isIdsEqual(comment.endUserId, endUserId)) {
      throw new UnauthorizedException(
        "You can not modify this comment because it isn't yours",
      );
    }

    await this.commentRepository.delete({ commentId });
    return comment;
  }
}
