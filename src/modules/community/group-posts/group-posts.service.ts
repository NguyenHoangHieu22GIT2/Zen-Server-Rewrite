import { Injectable } from '@nestjs/common';
import { CreateGroupPostDto } from './dto/create-group-post.dto';
import { UpdateGroupPostDto } from './dto/update-group-post.dto';

@Injectable()
export class GroupPostsService {
  create(createGroupPostDto: CreateGroupPostDto) {
    return 'This action adds a new groupPost';
  }

  findAll() {
    return `This action returns all groupPosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupPost`;
  }

  update(id: number, updateGroupPostDto: UpdateGroupPostDto) {
    return `This action updates a #${id} groupPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupPost`;
  }
}
