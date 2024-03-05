import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import {
  IEventServiceUnstable,
  IEventServiceUnstableString,
} from './services/unstable/event.unstable.interface';
import { ApiTags } from '@nestjs/swagger';
import { TryCatchDecorator } from 'src/cores/decorators/TryCatchDecorator.decorator';
import {
  IGroupServiceUnstable,
  IGroupServiceUnstableString,
} from '../group/services';
import { RequestUser } from 'src/common/types/utilTypes';
import { CreateEventDto } from './dto';
import { CompareIdToThrowError } from 'src/common/utils';

@Controller('event')
@ApiTags('Event')
@TryCatchDecorator()
export class EventController {
  constructor(
    @Inject(IEventServiceUnstableString)
    private readonly eventService: IEventServiceUnstable,

    @Inject(IGroupServiceUnstableString)
    private readonly groupService: IGroupServiceUnstable,
  ) {}

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
}
