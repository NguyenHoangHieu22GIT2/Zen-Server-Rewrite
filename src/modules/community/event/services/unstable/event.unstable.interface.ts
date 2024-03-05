import {
  DocumentMongodbType,
  EventAggregation,
} from 'src/common/types/mongodbTypes';
import { Event } from '../../entities';
import { EndUserId, EventId } from 'src/common/types/utilTypes';
import { ModifyEventDto } from '../../dto';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export abstract class IEventServiceUnstable {
  abstract getEvents(
    queryLimitSkip: QueryLimitSkip,
  ): Promise<EventAggregation[]>;

  abstract modifyEvent(
    endUserId: EndUserId,
    modifyEventDto: ModifyEventDto,
  ): Promise<DocumentMongodbType<Event>>;

  abstract deleteEvent(
    endUserId: EndUserId,
    eventId: EventId,
  ): Promise<DocumentMongodbType<Event>>;
}
