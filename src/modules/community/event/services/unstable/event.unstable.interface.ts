import {
  DocumentMongodbType,
  PopulateEndUserAggregation,
} from 'src/common/types/mongodbTypes';
import { Event } from '../../entities';
import { EndUserId, EventId, GroupId } from 'src/common/types/utilTypes';
import { CreateEventDto, ModifyEventDto } from '../../dto';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export const IEventServiceUnstableString = 'IEventServiceUnstable';

export type CreateEventParams = {
  endUserId: EndUserId;
  createEventDto: CreateEventDto & { endUserId: EndUserId };
};

export interface IEventServiceUnstable {
  createEvent(
    createEventParams: CreateEventParams,
  ): Promise<DocumentMongodbType<Event>>;

  findEvent(eventId: EventId): Promise<DocumentMongodbType<Event>>;

  getEvents(
    queryLimitSkip: QueryLimitSkip,
    groupId: GroupId,
  ): Promise<PopulateEndUserAggregation<Event>[]>;

  modifyEvent(
    endUserId: EndUserId,
    modifyEventDto: ModifyEventDto,
  ): Promise<DocumentMongodbType<Event>>;

  deleteEvent(
    endUserId: EndUserId,
    eventId: EventId,
  ): Promise<DocumentMongodbType<Event>>;
}
