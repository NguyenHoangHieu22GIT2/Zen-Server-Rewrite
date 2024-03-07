import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
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
import { CreateEventDto } from './dto';
import { FindEventDto } from './dto/find-event.dto';

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

  @Get(':eventId')
  findEvent(@Param() param: FindEventDto, @Req() req: RequestUser) {}
}
