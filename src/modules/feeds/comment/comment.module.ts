import { Module } from '@nestjs/common';
import { CommentServiceUnstable } from './services/unstable/comment.unstable.service';
import { CommentServiceStable } from './services/stable/comment.stable.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './entities/comment.entity';

@Module({
  controllers: [CommentController],
  providers: [CommentServiceUnstable, CommentServiceStable],
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
})
export class CommentModule {}
