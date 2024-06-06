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
  UnauthorizedException,
} from '@nestjs/common';
import {
  IEventServiceUnstable,
  IEventServiceUnstableString,
} from './services/unstable/event.unstable.interface';
import { ApiTags } from '@nestjs/swagger';

import { RequestUser } from 'src/common/types/utilTypes';
import { CreateEventDto, ModifyEventDto } from './dto';
import { FindEventDto } from './dto/find-event.dto';

import { QueryLimitSkip } from 'src/cores/global-dtos';
import { FindGroupDto } from '../group-members';
import { createEventSwaggerAPIDecorators } from 'src/documents/swagger-api/events/create-event.api';
import { getEventSwaggerAPIDecorators } from 'src/documents/swagger-api/events/get-events.api';
import { findEventSwaggerAPIDecorators } from 'src/documents/swagger-api/events/find-event.api';
import { modifyEventSwaggerAPIDecorators } from 'src/documents/swagger-api/events/modify-event.dto';
import { deleteEventSwaggerAPIDecorators } from 'src/documents/swagger-api/events/delete-event.api';
import { IGroupService, IGroupServiceString } from '../group/services';
import {
  IGroupMembersService,
  IGroupMembersServiceString,
} from '../group-members/services/group-members.interface';
// TODO: Really coupled with other modules! Not good
@Controller('event')
@ApiTags('Event')
export class EventController {
  constructor(
    @Inject(IEventServiceUnstableString)
    private readonly eventService: IEventServiceUnstable,

    @Inject(IGroupServiceString)
    private readonly groupService: IGroupService,

    @Inject(IGroupMembersServiceString)
    private readonly groupMembersService: IGroupMembersService,
  ) {}

  @Post()
  @createEventSwaggerAPIDecorators()
  async createEvent(
    @Req() req: RequestUser,
    @Body() createEventDto: CreateEventDto,
  ) {
    const group = await this.groupService.findGroup(createEventDto.groupId);

    const event = await this.eventService.createEvent({
      endUserId: req.user._id,
      createEventDto: { ...createEventDto, endUserId: group.endUserId },
    });
    return event;
  }

  @Get(':groupId')
  @getEventSwaggerAPIDecorators()
  async getEvents(
    @Query() query: QueryLimitSkip,
    @Param() param: FindGroupDto,
    @Req() req: RequestUser,
  ) {
    const groupMember = await this.groupMembersService.findGroupMember({
      groupId: param.groupId,
      endUserId: req.user._id,
    });
    if (!groupMember) {
      throw new UnauthorizedException("You don't have access to this");
    }
    return this.eventService.getEvents(query, param.groupId);
  }

  @Get(':eventId')
  @findEventSwaggerAPIDecorators()
  async findEvent(@Param() param: FindEventDto, @Req() req: RequestUser) {
    const event = await this.eventService.findEvent(param.eventId);

    const groupMember = await this.groupMembersService.findGroupMember({
      groupId: event.groupId,
      endUserId: req.user._id,
    });

    if (!groupMember) {
      throw new UnauthorizedException("You don't have access to this");
    }

    return event;
  }

  @Delete(':eventId')
  @deleteEventSwaggerAPIDecorators()
  async deleteEvent(@Param() param: FindEventDto, @Req() req: RequestUser) {
    return this.eventService.deleteEvent(req.user._id, param.eventId);
  }

  @Patch()
  @modifyEventSwaggerAPIDecorators()
  async modifyEvent(
    @Req() req: RequestUser,
    @Body() modifyEventDto: ModifyEventDto,
  ) {
    return this.eventService.modifyEvent(req.user._id, modifyEventDto);
  }
}
