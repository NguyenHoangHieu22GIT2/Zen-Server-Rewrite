import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostServiceUnstable } from './unstable/post.unstable.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RequestUser } from 'src/common/types/utilTypes/RequestUser';
import { LoggedInGuard } from 'src/modules/auth/passport/loggedIn.guard';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/convertToMongodbId';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostController {
  constructor(private readonly postUnstableService: PostServiceUnstable) {}

  @Post()
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: RequestUser,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const endUserId = checkToConvertToMongoIdOrThrowError<EndUserId>({
      id: req.user._id,
      returnError: true,
    });
    const post = await this.postUnstableService.createPost({
      endUserId,
      createPostDto,
      images,
    });
    return post;
  }
}
