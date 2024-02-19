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
  Param,
  Patch,
  Delete,
  NotFoundException,
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
import { PostRedisStableService } from './services/stable/post.redis.stable.service';
import { PostServiceUnstable } from './services/unstable/post.unstable.service';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/feeds';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { Post as PostEntity } from './entities/post.entity';
import { FindPostDto } from './dto/find-post.dto';
import { GetUserPostsDto } from './dto/get-user-posts.dto';
import { ModifyPostDto } from './dto/modify-post.dto';
import { CreatePostSwaggerAPIDecorators } from 'src/documents/swagger-api/posts/create-post.api';
import { GetPostsSwaggerAPIDecorators } from 'src/documents/swagger-api/posts/get-posts';
import { GetPostSwaggerAPIDecorators } from 'src/documents/swagger-api/posts/get-post';
import { ModifyPostsSwaggerAPIDecorators } from 'src/documents/swagger-api/posts/modify-post';
import { DeletePostsSwaggerAPIDecorators } from 'src/documents/swagger-api/posts/delete-post';

@ApiTags('Post')
@Controller('posts')
@UseGuards(LoggedInGuard)
export class PostController {
  constructor(
    private readonly postUnstableService: PostServiceUnstable,
    private readonly postRedisStableService: PostRedisStableService,
  ) {}

  @Get('/user')
  @GetPostsSwaggerAPIDecorators()
  async getUserPosts(
    @Req() req: RequestUser,
    @Query() getUserPostsDto: GetUserPostsDto,
  ) {
    const posts = await this.postUnstableService.getUserPosts({
      endUserId: req.user._id,
      getUserPostsDto,
    });

    await this.postRedisStableService.savePosts(posts);
    return posts;
  }

  @Get('recommend')
  @GetPostsSwaggerAPIDecorators()
  async getRecommendedPosts(
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

  @Get(':postId')
  @GetPostSwaggerAPIDecorators()
  async getPost(@Req() req: RequestUser, @Param() findPostDto: FindPostDto) {
    const post = await this.postUnstableService.findPost(findPostDto);
    if (!post) {
      throw new NotFoundException('No Post was found!');
    }
    await this.postRedisStableService.savePosts([post]);
    return post;
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @CreatePostSwaggerAPIDecorators()
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

  @Patch()
  @UseInterceptors(FilesInterceptor('files'))
  @ModifyPostsSwaggerAPIDecorators()
  async modifyPost(
    @Req() req: RequestUser,
    @Body() modifyPostDto: ModifyPostDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    checkImagesTypeToThrowError(images);

    const { createdImageObjects, imageNames } =
      createImageObjectsToSave(images);

    storeFiles(createdImageObjects);

    const modifiedPost = await this.postUnstableService.modifyPost({
      endUserId: req.user._id,
      modifyPostDto: modifyPostDto,
      images: imageNames,
    });

    return modifiedPost;
  }

  @Delete('/:postId')
  @DeletePostsSwaggerAPIDecorators()
  async deletePost(@Req() req: RequestUser, @Param() findPostDto: FindPostDto) {
    const post = await this.postUnstableService.deletePost({
      endUserId: req.user._id,
      postId: findPostDto.postId,
    });
    return post;
  }
}
