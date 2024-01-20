import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../entities/post.entity';
import { Model } from 'mongoose';
import { PostServiceStable } from '../stable/post.stable.service';
import { getPostsDto } from '../dto/get-posts.dto';
import { FindPostDto } from '../dto/find-post.dto';
import { EndUserId } from 'src/common/types/utilTypes/Brand';

@Injectable()
export class PostServiceUnstable {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly postServiceStable: PostServiceStable,
  ) {}

  public async findPost(findPostDto: FindPostDto) {
    try {
      const post = await this.postServiceStable.findPost(findPostDto);
      return post;
    } catch (error) {
      throw error;
    }
  }

  public async getPosts(getPostsDto: getPostsDto) {
    try {
      const posts = await this.postServiceStable.getPosts(getPostsDto);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  public async createPost({
    createPostDto,
    userId,
  }: {
    createPostDto: CreatePostDto;
    userId: EndUserId;
  }) {
    try {
      const createdPost = await this.postServiceStable.createPost({
        createPostDto,
        userId,
      });
      return createdPost;
    } catch (error) {
      throw error;
    }
  }
}
