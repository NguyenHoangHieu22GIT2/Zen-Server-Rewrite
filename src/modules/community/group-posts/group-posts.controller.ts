import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupPostsService } from './group-posts.service';
import { CreateGroupPostDto } from './dto/create-group-post.dto';
import { UpdateGroupPostDto } from './dto/update-group-post.dto';

@Controller('group-posts')
export class GroupPostsController {
  constructor(private readonly groupPostsService: GroupPostsService) {}

  @Post()
  create(@Body() createGroupPostDto: CreateGroupPostDto) {
    return this.groupPostsService.create(createGroupPostDto);
  }

  @Get()
  findAll() {
    return this.groupPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupPostsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupPostDto: UpdateGroupPostDto) {
    return this.groupPostsService.update(+id, updateGroupPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupPostsService.remove(+id);
  }
}
