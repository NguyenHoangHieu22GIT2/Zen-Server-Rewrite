import { CommentId, EndUserId } from 'src/common/types/utilTypes';
import { CreateCommentDto, GetCommentsDto } from '../../dto';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { Comment } from '../../entities';
import { PipelineStage } from 'mongoose';

export type ICommentStableServiceArgs = {
  getCommentsAggregate: {
    getCommentsDto: GetCommentsDto;
    pipelineStages?: PipelineStage[];
  };

  findCommentById: CommentId;

  createComment: {
    createCommentDto: CreateCommentDto;
    endUserId: EndUserId;
  };

  saveComment: {
    commentId: CommentId;
    data: Partial<Comment>;
  };
  deleteComment: {
    commentId: CommentId;
  };
};

export const ICommentStableServiceString = 'ICommentStableService';

export interface ICommentStableService {
  getCommentsAggregate<CustomTypeForPipeLine>(
    args: ICommentStableServiceArgs['getCommentsAggregate'],
  ): Promise<(Comment & CustomTypeForPipeLine)[]>;

  findCommentById(
    args: ICommentStableServiceArgs['findCommentById'],
  ): Promise<DocumentMongodbType<Comment>>;

  createComment(
    createComment: ICommentStableServiceArgs['createComment'],
  ): Promise<DocumentMongodbType<Comment>>;

  saveComment(args: ICommentStableServiceArgs['saveComment']): Promise<unknown>;

  deleteComment(
    args: ICommentStableServiceArgs['deleteComment'],
  ): Promise<unknown>;
}
