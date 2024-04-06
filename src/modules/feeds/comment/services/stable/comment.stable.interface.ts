import { CommentId, EndUserId } from 'src/common/types/utilTypes';
import {
  CreateCommentDto,
  FindCommentDto,
  GetCommentsDto,
  ModifyCommentDto,
} from '../../dto';
import { TcommentsLookUpEndUser } from '../../types';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { Comment } from '../../entities';
import { PipelineStage } from 'mongoose';

export const ICommentStableServiceString = 'ICommentStableService';

export interface ICommentStableService {
  getCommentsAggregate<CustomTypeForPipeLine>(
    getCommentsDto: GetCommentsDto,
    pipelineStages?: PipelineStage[],
  ): Promise<(Comment & CustomTypeForPipeLine)[]>;

  findCommentById(commentId: CommentId): Promise<DocumentMongodbType<Comment>>;

  createComment({
    endUserId,
    createCommentDto,
  }: {
    createCommentDto: CreateCommentDto;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Comment>>;
}
