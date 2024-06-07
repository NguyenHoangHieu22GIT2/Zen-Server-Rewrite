import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './entities/comment.entity';
import { ICommentServiceString } from './services/comment.interface';
import { CommentService } from './services';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { CommentRepository } from './repository/comment.repository';

@Module({
  controllers: [CommentController],
  providers: [
    {
      provide: BaseRepositoryName,
      useClass: CommentRepository,
    },
    {
      provide: ICommentServiceString,
      useClass: CommentService,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  exports: [
    {
      provide: ICommentServiceString,
      useClass: CommentService,
    },
  ],
})
export class CommentModule {}
