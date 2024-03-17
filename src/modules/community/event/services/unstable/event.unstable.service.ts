import { Inject, Injectable } from '@nestjs/common';
import {
  CreateEventParams,
  IEventServiceUnstable,
} from './event.unstable.interface';
import {
  IEventServiceStable,
  IEventServiceStableString,
} from '../stable/event.stable.interface';
import {
  DocumentMongodbType,
  EventAggregation,
} from 'src/common/types/mongodbTypes';
import { Event } from '../../entities';
import { EndUserId, EventId, GroupId } from 'src/common/types/utilTypes';
import { ModifyEventDto } from '../../dto';
import { isIdsEqual, PopulateSkipAndLimit } from 'src/common/utils';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { LookUpEndUserAggregate } from 'src/common/constants';

@Injectable()
export class EventServiceUnstable implements IEventServiceUnstable {
  constructor(
    @Inject(IEventServiceStableString)
    private readonly eventServiceStable: IEventServiceStable,
  ) {}

  async findEvent(eventId: EventId): Promise<DocumentMongodbType<Event>> {
    const event = await this.eventServiceStable.findEvent(eventId);
    return event;
  }

  async createEvent({
    endUserId,
    createEventDto,
  }: CreateEventParams): Promise<DocumentMongodbType<Event>> {
    CompareIdToThrowError(endUserId, createEventDto.endUserId);

    const event = await this.eventServiceStable.createEvent(
      endUserId,
      createEventDto,
    );
    return event;
  }

  async getEvents(queryLimitSkip: QueryLimitSkip, groupId: GroupId) {
    const events = await this.eventServiceStable.getEvents<EventAggregation>([
      { $match: { groupId } },
      ...PopulateSkipAndLimit(queryLimitSkip),
      ...LookUpEndUserAggregate,
    ]);
    return events;
  }

  async deleteEvent(
    endUserId: EndUserId,
    eventId: EventId,
  ): Promise<DocumentMongodbType<Event>> {
    const event = await this.eventServiceStable.findEvent(eventId);
    isIdsEqual(endUserId, event.endUserId);
    await event.deleteOne();
    return event;
  }

  async modifyEvent(
    endUserId: EndUserId,
    modifyEventDto: ModifyEventDto,
  ): Promise<DocumentMongodbType<Event>> {
    const event = await this.eventServiceStable.findEvent(
      modifyEventDto.eventId,
    );
    isIdsEqual(endUserId, event.endUserId);

    Object.assign(event, modifyEventDto);
    return event.save();
  }
}
