import { Injectable, UnauthorizedException } from '@nestjs/common';
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
import { tryCatchModified } from 'src/common/utils/';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';
import { Comment } from '../../entities/';

@Injectable()
export class CommentServiceUnstable {
  constructor(private readonly commentServiceStable: CommentServiceStable) {}

  async getComments(getCommentsDto: GetCommentsDto) {
    return tryCatchModified(async () => {
      const comments: TcommentsLookUpEndUser =
        await this.commentServiceStable.getCommentsAggregate<{
          endUser: userMinimalType;
        }>(getCommentsDto, LookUpEndUserAggregate);

      return comments;
    });
  }

  async findComment(findCommentDto: FindCommentDto) {
    return tryCatchModified(async () => {
      const comment: TcommentsLookUpEndUser[0] =
        await this.commentServiceStable.findCommentAggregate<{
          endUser: userMinimalType;
        }>(findCommentDto, LookUpEndUserAggregate);

      return comment;
    });
  }

  async createComment({
    endUserId,
    createCommentDto,
  }: {
    createCommentDto: CreateCommentDto;
    endUserId: EndUserId;
  }) {
    return tryCatchModified(async () => {
      const comment = await this.commentServiceStable.createComment({
        endUserId,
        createCommentDto,
      });
      return comment;
    });
  }

  async modifyComment({
    endUserId,
    modifyCommentDto,
  }: {
    modifyCommentDto: ModifyCommentDto;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Comment>> {
    return tryCatchModified(async () => {
      const comment = await this.commentServiceStable.findCommentById(
        modifyCommentDto.commentId,
      );
      if (!comment.endUserId.equals(endUserId)) {
        throw new UnauthorizedException(
          "You can not modify this comment because it isn't yours",
        );
      }
      comment.content = modifyCommentDto.comment;
      return comment.save();
    });
  }

  async deleteComment({
    endUserId,
    findCommentDto,
  }: {
    findCommentDto: FindCommentDto;
    endUserId: EndUserId;
  }) {
    return tryCatchModified(async () => {
      const commentId = findCommentDto.commentId;
      const comment =
        await this.commentServiceStable.findCommentById(commentId);
      if (!comment.endUserId.equals(endUserId)) {
        throw new UnauthorizedException(
          "You can not modify this comment because it isn't yours",
        );
      }
      return comment;
    });
  }
}
