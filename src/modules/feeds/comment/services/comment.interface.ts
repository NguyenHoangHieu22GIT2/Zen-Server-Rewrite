import { EndUserId } from 'src/common/types/utilTypes';
import {
  CreateCommentDto,
  FindCommentDto,
  GetCommentsDto,
  ModifyCommentDto,
} from '../dto';
import { TcommentsLookUpEndUser } from '../types';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { Comment } from '../entities';

export const ICommentServiceString = 'ICommentService';

export interface ICommentService {
  getComments(getCommentsDto: GetCommentsDto): Promise<TcommentsLookUpEndUser>;

  findComment(
    findCommentDto: FindCommentDto,
  ): Promise<TcommentsLookUpEndUser[0]>;

  createComment({
    endUserId,
    createCommentDto,
  }: {
    createCommentDto: CreateCommentDto;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Comment>>;

  modifyComment({
    endUserId,
    modifyCommentDto,
  }: {
    modifyCommentDto: ModifyCommentDto;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Comment>>;

  deleteComment({
    endUserId,
    findCommentDto,
  }: {
    findCommentDto: FindCommentDto;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Comment>>;
}
