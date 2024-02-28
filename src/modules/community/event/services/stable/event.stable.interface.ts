import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { Event } from '../../entities';
import { CreateEventDto } from '../../dto';
import { EndUserId, EventId } from 'src/common/types/utilTypes';
import { PipelineStage } from 'mongoose';

export const IEventServiceStableString = 'IEventServiceStable';

export interface IEventServiceStable {
  createEvent(
    endUserId: EndUserId,
    createEventDto: CreateEventDto,
  ): Promise<DocumentMongodbType<Event>>;

  findEvent(eventId: EventId): Promise<DocumentMongodbType<Event>>;

  getEvents<T>(pipelineStages: PipelineStage[]): Promise<T[]>;
}
