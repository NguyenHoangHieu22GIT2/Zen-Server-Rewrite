import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { PostServiceUnstable } from './unstable/post.unstable.service';
import { CreatePostDto } from './dto/create-post.dto';
import { RequestUser } from 'src/common/types/utilTypes/RequestUser';
import { LoggedInGuard } from 'src/modules/auth/passport/loggedIn.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { checkImagesTypeToThrowErrors } from 'src/common/utils/checkImageType';
import { PostServiceStable } from './stable/post.stable.service';
import { storeFiles } from 'src/common/utils/storeFile';
import { PostRedisStableService } from './stable/post.redis.stable.service';
import createImageObjectsToSave from 'src/common/utils/createImageObjectsToSave';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postUnstableService: PostServiceUnstable,
    private readonly postStableService: PostServiceStable,
    private readonly postRedisStableService: PostRedisStableService,
  ) {}

  @Get()
  async getPosts(@Req() req: RequestUser, @Query() query: QueryLimitSkip) {
    const posts = await this.postUnstableService.getPosts({
      endUserId: req.user._id,
      queryLimitSkip: query,
    });

    await this.postRedisStableService.savePosts(posts);
  }

  @Post()
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: RequestUser,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    checkImagesTypeToThrowErrors(images);

    const { createdImageObjects, imageNames } =
      createImageObjectsToSave(images);

    storeFiles(createdImageObjects);

    const post = await this.postUnstableService.createPost({
      endUserId: req.user._id,
      createPostDto,
      imageNames,
    });

    return post;
  }
}
