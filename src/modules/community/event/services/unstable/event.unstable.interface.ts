import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { Event } from '../../entities';

export const IEventServiceUnstableString = 'IEventServiceUnstable';

export interface IEventServiceUnstable {
  createEvent(): Promise<DocumentMongodbType<Event>>;

  getEvents(): Promise<DocumentMongodbType<Event>>;

  findEvent(): Promise<DocumentMongodbType<Event>>;

  modifyEvent(): Promise<DocumentMongodbType<Event>>;

  deleteEvent(): Promise<DocumentMongodbType<Event>>;
}
