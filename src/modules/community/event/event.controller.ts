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
import { TryCatchDecorator } from 'src/cores/decorators/TryCatch.decorator';
import {
  IGroupServiceUnstable,
  IGroupServiceUnstableString,
} from '../group/services';
import { RequestUser } from 'src/common/types/utilTypes';
import { CreateEventDto, ModifyEventDto } from './dto';
import { FindEventDto } from './dto/find-event.dto';
import {
  IGroupMembersServiceUnstable,
  IGroupMembersServiceUnstableString,
} from '../group-members/services/unstable/group-members.interface';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { FindGroupDto } from '../group-members';

@Controller('event')
@ApiTags('Event')
@TryCatchDecorator()
export class EventController {
  constructor(
    @Inject(IEventServiceUnstableString)
    private readonly eventService: IEventServiceUnstable,

    @Inject(IGroupServiceUnstableString)
    private readonly groupService: IGroupServiceUnstable,

    @Inject(IGroupMembersServiceUnstableString)
    private readonly groupMembersService: IGroupMembersServiceUnstable,
  ) { }

  @Post()
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
  async deleteEvent(@Param() param: FindEventDto, @Req() req: RequestUser) {
    return this.eventService.deleteEvent(req.user._id, param.eventId);
  }

  @Patch()
  async modifyEvent(
    @Req() req: RequestUser,
    @Body() modifyEventDto: ModifyEventDto,
  ) {
    return this.eventService.modifyEvent(req.user._id, modifyEventDto);
  }
}
