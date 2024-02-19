import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../../entities/';
import { Model, PipelineStage } from 'mongoose';
import { GetCommentsDto, FindCommentDto, CreateCommentDto } from '../../dto/';
import { CommentId, EndUserId } from 'src/common/types/utilTypes/';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';

@Injectable()
export class CommentServiceStable {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async getCommentsAggregate<CustomTypeForPipeLine>(
    getCommentsDto: GetCommentsDto,
    pipelineStages?: PipelineStage[],
  ): Promise<(Comment & CustomTypeForPipeLine)[]> {
    const comments = await this.commentModel.aggregate<
      Comment & CustomTypeForPipeLine
    >([
      { $match: { postId: getCommentsDto.postId } },
      {
        $skip: getCommentsDto.skip,
      },
      { $limit: getCommentsDto.limit },
      ...pipelineStages,
    ]);

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
    commentId: CommentId,
  ): Promise<DocumentMongodbType<Comment>> {
    return this.commentModel.findById(commentId);
  }

  async createComment({
    endUserId,
    createCommentDto,
  }: {
    createCommentDto: CreateCommentDto;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Comment>> {
    const comment = await this.commentModel.create({
      endUserId,
      ...createCommentDto,
    });
    return comment;
  }

  async deleteComment(commentId: CommentId) {
    await this.commentModel.deleteOne({
      _id: commentId,
    });
  }
}
