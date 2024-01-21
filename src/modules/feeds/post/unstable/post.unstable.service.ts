import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../entities/post.entity';
import { Model } from 'mongoose';
import { PostServiceStable } from '../stable/post.stable.service';
import { getPostsDto } from '../dto/get-posts.dto';
import { FindPostDto } from '../dto/find-post.dto';
import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { ModifyPostDto } from '../dto/modify-post.dto';
import {
  checkImageType,
  checkImagesType,
} from 'src/common/utils/checkImageType';
import { storeFile, storeFiles } from 'src/common/utils/storeFile';

@Injectable()
export class PostServiceUnstable {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly postServiceStable: PostServiceStable,
  ) {}

  public async createPost({
    createPostDto,
    endUserId,
    images,
  }: {
    createPostDto: CreatePostDto;
    endUserId: EndUserId;
    images: Express.Multer.File[];
  }) {
    try {
      checkImagesType(images);

      storeFiles()

      const createdPost = await this.postServiceStable.createPost({
        createPostDto,
        endUserId,
      });
      return createdPost;
    } catch (error) {
      throw error;
    }
  }

  public async findPost(findPostDto: FindPostDto) {
    try {
      const post =
        await this.postServiceStable.findPostAggregation(findPostDto);
      return post;
    } catch (error) {
      throw error;
    }
  }

  public async getPosts(getPostsDto: getPostsDto) {
    try {
      const posts =
        await this.postServiceStable.getPostsAggregation(getPostsDto);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  public async modifyPost({
    endUserId,
    modifyPostDto,
  }: {
    modifyPostDto: ModifyPostDto;
    endUserId: EndUserId;
  }) {
    try {
      const post = await this.postServiceStable.modifyPost({
        modifyPostDto,
        endUserId,
      });
      return post;
    } catch (error) {
      throw error;
    }
  }

  public async deletePost({
    postId,
    endUserId,
  }: {
    endUserId: EndUserId;
    postId: PostId;
  }) {
    try {
      const post = await this.postServiceStable.deletePost({
        postId,
        endUserId,
      });
      return post;
    } catch (error) {
      throw error;
    }
  }
}
