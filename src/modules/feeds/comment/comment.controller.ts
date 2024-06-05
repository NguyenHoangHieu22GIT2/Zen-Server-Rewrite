import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ModifyCommentDto,
  GetCommentsDto,
  FindCommentDto,
  CreateCommentDto,
} from './dto/';
import { TcommentsLookUpEndUser } from './types/';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/modules/auth/passport/';
import { RequestUser } from 'src/common/types/utilTypes/';
import {
  ICommentService,
  ICommentServiceString,
} from './services/comment.interface';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(
    @Inject(ICommentServiceString)
    private readonly commentService: ICommentService,
  ) {}

  @Get()
  async getComments(
    @Query() getCommentsDto: GetCommentsDto,
  ): Promise<TcommentsLookUpEndUser> {
    const comments = await this.commentService.getComments(getCommentsDto);
    return comments;
  }

  @Get(':commentId')
  async findComment(@Param() param: FindCommentDto) {
    const comment = await this.commentService.findComment(param);
    return comment;
  }

  @UseGuards(LoggedInGuard)
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: RequestUser,
  ) {
    const comment = await this.commentService.createComment({
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
    const comment = await this.commentService.modifyComment({
      endUserId: req.user._id,
      modifyCommentDto,
    });
    return comment;
  }

  @UseGuards(LoggedInGuard)
  @Delete(':commentId')
  async deleteComment(@Query() query: FindCommentDto, @Req() req: RequestUser) {
    const comment = await this.commentService.deleteComment({
      endUserId: req.user._id,
      findCommentDto: query,
    });
    return comment;
  }
}
