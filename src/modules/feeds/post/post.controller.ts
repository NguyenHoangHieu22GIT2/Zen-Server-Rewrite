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
  Inject,
} from '@nestjs/common';
import { RequestUser } from 'src/common/types/utilTypes/';
import { LoggedInGuard } from 'src/modules/auth/';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { QueryLimitSkip } from 'src/cores/global-dtos/';
import {
  isImagesTheRightType,
  storeFiles,
  createImageObjectsToSave,
} from 'src/common/utils/index';
import { PostRedisService } from './services/post.redis.service';
import {
  DocumentMongodbType,
  PopulateEndUserAggregation,
} from 'src/common/types/mongodbTypes/';
import { Post as PostEntity } from './entities/';
import {
  FindPostDto,
  GetUserPostsDto,
  ModifyPostDto,
  CreatePostDto,
} from './dto/';

import {
  CreatePostSwaggerAPIDecorators,
  GetPostsSwaggerAPIDecorators,
  GetPostSwaggerAPIDecorators,
  ModifyPostsSwaggerAPIDecorators,
  DeletePostsSwaggerAPIDecorators,
} from 'src/documents/swagger-api/posts/';
import { FindByIdEndUserDto } from 'src/modules/users/enduser';
import { IPostService, IPostServiceString } from './services/post.interface';

@ApiTags('Post')
@Controller('posts')
@UseGuards(LoggedInGuard)
export class PostController {
  constructor(
    @Inject(IPostServiceString)
    private readonly postService: IPostService,
    private readonly postRedisService: PostRedisService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @CreatePostSwaggerAPIDecorators()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: RequestUser,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<DocumentMongodbType<PostEntity>> {
    const imageNames: string[] = [];

    if (images) {
      isImagesTheRightType(images);

      const { createdImageObjects, imageNames: imgNames } =
        createImageObjectsToSave(images);

      imageNames.push(...imgNames);

      storeFiles(createdImageObjects);
    }

    const post = await this.postService.createPost({
      endUserId: req.user._id,
      createPostDto,
      imageNames,
    });

    return post;
  }

  @Get('recommend')
  @GetPostsSwaggerAPIDecorators()
  async getRecommendedPosts(
    @Req() req: RequestUser,
    @Query() query: QueryLimitSkip,
  ): Promise<PopulateEndUserAggregation<PostEntity>[]> {
    const posts = await this.postService.getRecommendedPosts({
      endUserId: req.user._id,
      queryLimitSkip: query,
    });

    await this.postRedisService.savePosts(posts);

    return posts;
  }

  @Get('/endusers/:endUserId')
  @GetPostsSwaggerAPIDecorators()
  async getUserPostsFromProfile(
    @Param() param: FindByIdEndUserDto,
    @Query() getUserPostsDto: GetUserPostsDto,
  ) {
    const posts = await this.postService.getUserPostsFromProfile({
      getUserPostsDto,
      endUserId: param.endUserId,
    });
    await this.postRedisService.savePosts(posts);

    return posts;
  }

  @Get('/groups/:endUserId')
  @GetPostsSwaggerAPIDecorators()
  async getUserPostsFromGroup(
    @Param() param: FindByIdEndUserDto,
    @Query() getUserPostsDto: GetUserPostsDto,
  ) {
    const posts = await this.postService.getUserPostsFromGroup({
      getUserPostsDto,
      endUserId: param.endUserId,
    });

    await this.postRedisService.savePosts(posts);

    return posts;
  }

  @Get(':postId')
  @GetPostSwaggerAPIDecorators()
  async getPost(@Req() req: RequestUser, @Param() findPostDto: FindPostDto) {
    // const postCached = await this.postRedisService.getPost(findPostDto.postId);

    // if (postCached) {
    //   return postCached;
    // }
    const post = await this.postService.findPost(findPostDto);
    if (!post) {
      throw new NotFoundException('No Post was found!');
    }
    await this.postRedisService.savePosts([post]);

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
    const imageNames: string[] = [];
    if (images) {
      isImagesTheRightType(images);

      const { createdImageObjects, imageNames: imgNames } =
        createImageObjectsToSave(images);
      imageNames.push(...imgNames);
      storeFiles(createdImageObjects);
    }

    const modifiedPost = await this.postService.modifyPost({
      endUserId: req.user._id,
      modifyPostDto: modifyPostDto,
      images: imageNames,
    });

    return modifiedPost;
  }

  @Delete('/:postId')
  @DeletePostsSwaggerAPIDecorators()
  async deletePost(@Req() req: RequestUser, @Param() findPostDto: FindPostDto) {
    const post = await this.postService.deletePost({
      endUserId: req.user._id,
      postId: findPostDto.postId,
    });
    return post;
  }
}
