import {
  DocumentMongodbType,
  EventAggregation,
} from 'src/common/types/mongodbTypes';
import { Event } from '../../entities';
import { EndUserId, EventId } from 'src/common/types/utilTypes';
import { ModifyEventDto } from '../../dto';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export const IEventServiceUnstableString = 'IEventServiceUnstable';

export interface IEventServiceUnstable {
  getEvents(queryLimitSkip: QueryLimitSkip): Promise<EventAggregation[]>;

  modifyEvent(
    endUserId: EndUserId,
    modifyEventDto: ModifyEventDto,
  ): Promise<DocumentMongodbType<Event>>;

  deleteEvent(
    endUserId: EndUserId,
    eventId: EventId,
  ): Promise<DocumentMongodbType<Event>>;
}
