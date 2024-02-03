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
import { CreatePostDto } from './dto/create-post.dto';
import { RequestUser } from 'src/common/types/utilTypes/RequestUser';
import { LoggedInGuard } from 'src/modules/auth/passport/loggedIn.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import {
  checkImagesTypeToThrowError,
  storeFiles,
  createImageObjectsToSave,
} from 'src/common/utils/index';
import {
  PostRedisStableService,
  PostServiceUnstable,
} from './services/post.service.index';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/post.aggregation';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { Post as PostEntity } from './entities/post.entity';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postUnstableService: PostServiceUnstable,
    private readonly postRedisStableService: PostRedisStableService,
  ) {}

  @Get('recommend')
  async getPosts(
    @Req() req: RequestUser,
    @Query() query: QueryLimitSkip,
  ): Promise<PostAggregation[]> {
    const posts = await this.postUnstableService.getRecommendedPosts({
      endUserId: req.user._id,
      queryLimitSkip: query,
    });

    await this.postRedisStableService.savePosts(posts);
    return posts;
  }

  @Post()
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: RequestUser,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<DocumentMongodbType<PostEntity>> {
    checkImagesTypeToThrowError(images);

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
