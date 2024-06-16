import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RequestUser } from 'src/common/types/utilTypes';
import { CreateGroupDto, ModifyGroupDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/modules/auth';

import { FindGroupDto } from '../group-members';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { SearchGroupsDto } from './dto/search-groups.dto';
import { createGroupSwaggerAPIDecorators } from 'src/documents/swagger-api/groups/create-group.api';
import { findGroupSwaggerAPIDecorators } from 'src/documents/swagger-api/groups/find-group.api';
import { getGroupsSwaggerAPIDecorators } from 'src/documents/swagger-api/groups/get-groups.api';
import { searchGroupsSwaggerAPIDecorators } from 'src/documents/swagger-api/groups/search-groups.api';
import { deleteGroupSwaggerAPIDecorators } from 'src/documents/swagger-api/groups/delete-group.api';
import { modifyGroupSwaggerAPIDecorators } from 'src/documents/swagger-api/groups/modify-group.api';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  createImageObjectsToSave,
  isImageTheRightType,
  storeFiles,
} from 'src/common/utils';
import { IGroupService, IGroupServiceString } from './services';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(
    @Inject(IGroupServiceString)
    private readonly groupService: IGroupService,
  ) {}

  @Post()
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FileInterceptor('files'))
  @createGroupSwaggerAPIDecorators()
  async createGroup(
    @Req() req: RequestUser,
    @Body() createGroupDto: CreateGroupDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    let imageName: string;
    if (image) {
      isImageTheRightType(image);

      const { createdImageObjects, imageNames } = createImageObjectsToSave([
        image,
      ]);
      imageName = imageNames[0];

      storeFiles(createdImageObjects);
    }

    const group = await this.groupService.createGroup(
      req.user._id,
      createGroupDto,
      imageName,
    );

    return group;
  }

  @Get(':groupId')
  @findGroupSwaggerAPIDecorators()
  findGroup(@Param() Param: FindGroupDto) {
    return this.groupService.findGroup(Param.groupId);
  }

  @Get()
  @getGroupsSwaggerAPIDecorators()
  getGroups(@Query() query: QueryLimitSkip) {
    return this.groupService.getGroups(query);
  }

  @Get('/search')
  @searchGroupsSwaggerAPIDecorators()
  searchGroups(@Query() query: SearchGroupsDto) {
    return this.groupService.searchGroups(query);
  }

  @Delete(':groupId')
  @UseGuards(LoggedInGuard)
  @deleteGroupSwaggerAPIDecorators()
  deleteGroup(@Req() req: RequestUser, @Param() param: FindGroupDto) {
    return this.groupService.deleteGroup(req.user._id, param.groupId);
  }

  @Patch(':groupId')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(LoggedInGuard)
  @modifyGroupSwaggerAPIDecorators()
  modifyGroup(
    @Req() req: RequestUser,
    @Body() modifyGroupDto: ModifyGroupDto,
    @Param() param: FindGroupDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    let imageName: string;
    if (image) {
      isImageTheRightType(image);

      const { createdImageObjects, imageNames } = createImageObjectsToSave([
        image,
      ]);
      imageName = imageNames[0];

      storeFiles(createdImageObjects);
    }
    return this.groupService.modifyGroup(
      req.user._id,
      param.groupId,
      modifyGroupDto,
      imageName,
    );
  }
}
