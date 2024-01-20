import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../entities/post.entity';
import { Model } from 'mongoose';
import { PostServiceStable } from '../stable/post.stable.service';
import { getPostsDto } from '../dto/get-posts.dto';
import { FindPostDto } from '../dto/find-post.dto';
import { nameOfCollections } from 'src/common/constants/name-of-collections';

@Injectable()
export class PostServiceUnstable {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly postServiceStable: PostServiceStable,
  ) {}

  public async findPost(findPostDto: FindPostDto) {
    const post = await this.postServiceStable.findPost(findPostDto);
    return post;
  }

  public async getPosts(getPostsDto: getPostsDto) {}
}
