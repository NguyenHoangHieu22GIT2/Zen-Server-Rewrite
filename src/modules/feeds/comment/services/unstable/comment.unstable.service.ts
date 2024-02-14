import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommentServiceStable } from '../stable/comment.stable.service';
import { LookUpEndUserAggregate } from 'src/common/constants/lookup-enduser.aggregate';
import { GetCommentsDto } from '../../dto/get-comments.dto';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';
import { TcommentsLookUpEndUser } from '../../types/comment.type';
import { FindCommentDto } from '../../dto/find-comment.dto';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { ModifyCommentDto } from '../../dto/modify-comment.dto';
import { tryCatchModified } from 'src/common/utils/tryCatchModified';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { Comment } from '../../entities/comment.entity';

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
