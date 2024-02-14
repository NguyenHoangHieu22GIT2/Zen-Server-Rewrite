import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentServiceUnstable } from './services/unstable/comment.unstable.service';
import { GetCommentsDto } from './dto/get-comments.dto';
import { FindCommentDto } from './dto/find-comment.dto';
import { TcommentsLookUpEndUser } from './types/comment.type';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { LoggedInGuard } from 'src/modules/auth/passport/loggedIn.guard';
import { RequestUser } from 'src/common/types/utilTypes/RequestUser';
import { ModifyCommentDto } from './dto/modify-comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentServiceUnstable: CommentServiceUnstable,
  ) {}

  @Get()
  async getComments(
    @Query() getCommentsDto: GetCommentsDto,
  ): Promise<TcommentsLookUpEndUser> {
    const comments =
      await this.commentServiceUnstable.getComments(getCommentsDto);
    return comments;
  }

  @Get(':commentId')
  async findComment(@Param() param: FindCommentDto) {
    const comment = await this.commentServiceUnstable.findComment(param);
    return comment;
  }

  @UseGuards(LoggedInGuard)
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: RequestUser,
  ) {
    const comment = await this.commentServiceUnstable.createComment({
      endUserId: req.user._id,
      createCommentDto,
    });
    return comment;
  }

  @UseGuards(LoggedInGuard)
  @Patch()
  async modifyComment(
    @Body() modifyCommentDto: ModifyCommentDto,
    @Req() req: RequestUser,
  ) {
    const comment = await this.commentServiceUnstable.modifyComment({
      endUserId: req.user._id,
      modifyCommentDto,
    });
    return comment;
  }

  @UseGuards(LoggedInGuard)
  @Delete(':commentId')
  async deleteComment(@Query() query: FindCommentDto, @Req() req: RequestUser) {
    const comment = await this.commentServiceUnstable.deleteComment({
      endUserId: req.user._id,
      findCommentDto: query,
    });
    return comment;
  }
}
