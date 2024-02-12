import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikeServiceUnstable } from './services/unstable/like.unstable.service';
import { RequestUser } from 'src/common/types/utilTypes/RequestUser';
import { FindPostDto } from '../post/dto/find-post.dto';
import { ToggleLikeSwaggerAPIDecorators } from 'src/documents/swagger-api/likes/toggle-like.api';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/modules/auth/passport/loggedIn.guard';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { GetNumberOfLikesSwaggerAPIDecorators } from 'src/documents/swagger-api/likes/get-number-of-likes.api';
import { GetLikesSwaggerAPIDecorators } from 'src/documents/swagger-api/likes/get-likes.api';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { Like } from './entities/like.entity';

@Controller('like')
@ApiTags('Like')
@UseGuards(LoggedInGuard)
export class LikeController {
  constructor(private readonly likeServiceUnstable: LikeServiceUnstable) {}

  @Post()
  @ToggleLikeSwaggerAPIDecorators()
  async toggleLike(
    @Req() req: RequestUser,
    @Body() findPostDto: FindPostDto,
  ): Promise<DocumentMongodbType<Like>> {
    return this.likeServiceUnstable.toggleLike({
      endUserId: req.user._id,
      postId: findPostDto.postId,
    });
  }

  /**
   * THIS IS FOR TESTING, NO USE IN PRODUCTION
   * */
  @Get('number/:postId')
  @GetNumberOfLikesSwaggerAPIDecorators()
  async getNumberOfLikes(@Param() findPostDto: FindPostDto) {
    return this.likeServiceUnstable.getNumberOfLikes(findPostDto.postId);
  }

  @Get(':postId')
  @GetLikesSwaggerAPIDecorators()
  async getLikes(
    @Query() queryLimitSkip: QueryLimitSkip,
    @Param() findPostDto: FindPostDto,
  ) {
    return this.likeServiceUnstable.getLikes({
      postId: findPostDto.postId,
      queryLimitSkip,
    });
  }
}
