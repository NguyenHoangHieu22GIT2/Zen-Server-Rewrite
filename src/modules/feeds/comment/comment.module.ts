import { Module } from '@nestjs/common';
import { CommentServiceUnstable } from './services/unstable/comment.unstable.service';
import { CommentServiceStable } from './services/stable/comment.stable.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './entities/comment.entity';
import { ICommentStableServiceString } from './services/stable/comment.stable.interface';
import { ICommentUnstableServiceString } from './services/unstable/comment.unstable.interface';

@Module({
  controllers: [CommentController],
  providers: [
    {
      provide: ICommentStableServiceString,
      useClass: CommentServiceStable,
    },
    {
      provide: ICommentUnstableServiceString,
      useClass: CommentServiceUnstable,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  exports: [
    {
      provide: ICommentStableServiceString,
      useClass: CommentServiceStable,
    },
    {
      provide: ICommentUnstableServiceString,
      useClass: CommentServiceUnstable,
    },
  ],
})
export class CommentModule {}
