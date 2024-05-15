import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommentServiceStable } from '../stable/comment.stable.service';
import { LookUpEndUserAggregate } from 'src/cores/mongodb-aggregations';
import {
  ModifyCommentDto,
  GetCommentsDto,
  FindCommentDto,
  CreateCommentDto,
} from '../../dto/';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';
import { TcommentsLookUpEndUser } from '../../types/comment.type';
import { EndUserId } from 'src/common/types/utilTypes/';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';
import { Comment } from '../../entities/';
import { TryCatchDecorator } from 'src/cores/decorators';
import { ICommentUnstableService } from './comment.unstable.interface';
import { ICommentStableServiceString } from '../stable/comment.stable.interface';
import { isIdsEqual } from 'src/common/utils';

@Injectable()
@TryCatchDecorator()
export class CommentServiceUnstable implements ICommentUnstableService {
  constructor(
    @Inject(ICommentStableServiceString)
    private readonly commentServiceStable: CommentServiceStable,
  ) {}

  async getComments(getCommentsDto: GetCommentsDto) {
    const comments: TcommentsLookUpEndUser =
      await this.commentServiceStable.getCommentsAggregate<{
        endUser: userMinimalType;
      }>({ getCommentsDto, pipelineStages: LookUpEndUserAggregate });

    return comments;
  }

  async findComment(findCommentDto: FindCommentDto) {
    const comment: TcommentsLookUpEndUser[0] =
      await this.commentServiceStable.findCommentAggregate<{
        endUser: userMinimalType;
      }>(findCommentDto, LookUpEndUserAggregate);

    return comment;
  }

  async createComment({
    endUserId,
    createCommentDto,
  }: {
    createCommentDto: CreateCommentDto;
    endUserId: EndUserId;
  }) {
    const comment = await this.commentServiceStable.createComment({
      endUserId,
      createCommentDto,
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
    const comment = await this.commentServiceStable.findCommentById(
      modifyCommentDto.commentId,
    );
    if (!comment.endUserId.equals(endUserId)) {
      throw new UnauthorizedException(
        "You can not modify this comment because it isn't yours",
      );
    }
    comment.content = modifyCommentDto.content;
    await this.commentServiceStable.saveComment({
      commentId: modifyCommentDto.commentId,
      data: comment,
    });
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
    const comment = await this.commentServiceStable.findCommentById(commentId);
    if (!isIdsEqual(comment.endUserId, endUserId)) {
      throw new UnauthorizedException(
        "You can not modify this comment because it isn't yours",
      );
    }

    await this.commentServiceStable.deleteComment({ commentId });
    return comment;
  }
}
