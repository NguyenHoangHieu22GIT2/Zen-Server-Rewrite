import { Inject, Injectable } from '@nestjs/common';
import { IEventServiceUnstable } from './event.unstable.interface';
import {
  IEventServiceStable,
  IEventServiceStableString,
} from '../stable/event.stable.interface';
import {
  DocumentMongodbType,
  EventAggregation,
} from 'src/common/types/mongodbTypes';
import { Event } from '../../entities';
import { EndUserId, EventId } from 'src/common/types/utilTypes';
import { ModifyEventDto } from '../../dto';
import { CompareIdToThrowError, PopulateSkipAndLimit } from 'src/common/utils';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { LookUpEndUserAggregate } from 'src/common/constants';

@Injectable()
export class EventServiceUnstable implements IEventServiceUnstable {
  constructor(
    @Inject(IEventServiceStableString)
    private readonly eventServiceStable: IEventServiceStable,
  ) {}

  async getEvents(queryLimitSkip: QueryLimitSkip) {
    const events = await this.eventServiceStable.getEvents<EventAggregation>([
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
    CompareIdToThrowError(endUserId, event.endUserId);
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
    CompareIdToThrowError(endUserId, event.endUserId);

    Object.assign(event, modifyEventDto);
    return event.save();
  }
}
