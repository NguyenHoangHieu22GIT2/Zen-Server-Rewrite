import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LikeServiceUnstable } from './services/unstable/';
import { RequestUser } from 'src/common/types/utilTypes/';
import { FindPostDto } from '../post/dto/';
import {
  ToggleLikeSwaggerAPIDecorators,
  GetNumberOfLikesSwaggerAPIDecorators,
  GetLikesSwaggerAPIDecorators,
} from 'src/documents/swagger-api/likes/';
import { LoggedInGuard } from 'src/modules/auth/passport/';
import { QueryLimitSkip } from 'src/cores/global-dtos/';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';
import { Like } from './entities/';
import { ILikeServiceUnstableString } from './services/unstable/like.unstable.interface';

@Controller('like')
@ApiTags('Like')
@UseGuards(LoggedInGuard)
export class LikeController {
  constructor(
    @Inject(ILikeServiceUnstableString)
    private readonly likeServiceUnstable: LikeServiceUnstable,
  ) {}

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
