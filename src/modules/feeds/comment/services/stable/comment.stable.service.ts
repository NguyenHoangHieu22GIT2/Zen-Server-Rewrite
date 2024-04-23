import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../../entities/';
import { Model, PipelineStage } from 'mongoose';
import { FindCommentDto } from '../../dto/';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';
import {
  ICommentStableService,
  ICommentStableServiceArgs,
} from './comment.stable.interface';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

@Injectable()
export class CommentServiceStable implements ICommentStableService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async getCommentsAggregate<CustomTypeForPipeLine>({
    getCommentsDto,
    pipelineStages,
  }: ICommentStableServiceArgs['getCommentsAggregate']): Promise<
    (Comment & CustomTypeForPipeLine)[]
  > {
    const postId = checkToConvertToMongoIdOrThrowError({
      id: getCommentsDto.postId.toString(),
      returnError: true,
    });
    const comments = await this.commentModel.aggregate<
      Comment & CustomTypeForPipeLine
    >([
      { $match: { postId: postId } },
      {
        $skip: +getCommentsDto.skip,
      },
      { $limit: +getCommentsDto.limit },
      ...pipelineStages,
    ]);
    console.log(comments);
    return comments;
  }

  async findCommentAggregate<CustomTypeForPipeLine>(
    findCommentDto: FindCommentDto,
    pipelineStages?: PipelineStage[],
  ): Promise<Comment & CustomTypeForPipeLine> {
    const comment = await this.commentModel.aggregate<
      Comment & CustomTypeForPipeLine
    >([{ $match: { _id: findCommentDto.commentId } }, ...pipelineStages]);
    return comment[0];
  }

  async findCommentById(
    commentId: ICommentStableServiceArgs['findCommentById'],
  ): Promise<DocumentMongodbType<Comment>> {
    return this.commentModel.findById(commentId);
  }

  async createComment({
    endUserId,
    createCommentDto,
  }: ICommentStableServiceArgs['createComment']): Promise<
    DocumentMongodbType<Comment>
  > {
    const comment = await this.commentModel.create({
      endUserId,
      ...createCommentDto,
    });
    return comment;
  }

  async saveComment({
    commentId,
    data,
  }: ICommentStableServiceArgs['saveComment']): Promise<unknown> {
    return this.commentModel.updateOne(commentId, data);
  }

  async deleteComment({
    commentId,
  }: ICommentStableServiceArgs['deleteComment']): Promise<unknown> {
    return this.commentModel.findByIdAndDelete(commentId);
  }
}
