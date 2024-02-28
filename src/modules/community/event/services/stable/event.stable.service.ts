import { Injectable } from '@nestjs/common';
import { IEventServiceStable } from './event.stable.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../../entities';
import { Model, PipelineStage } from 'mongoose';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId, EventId } from 'src/common/types/utilTypes';
import { CreateEventDto } from '../../dto';

@Injectable()
export class EventServiceStable implements IEventServiceStable {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  createEvent(
    endUserId: EndUserId,
    createEventDto: CreateEventDto,
  ): Promise<DocumentMongodbType<Event>> {
    return this.eventModel.create({ endUserId, ...createEventDto });
  }

  findEvent(eventId: EventId): Promise<DocumentMongodbType<Event>> {
    return this.eventModel.findById(eventId);
  }

  getEvents<T>(pipelineStages: PipelineStage[]): Promise<T[]> {
    return this.eventModel.aggregate(pipelineStages);
  }
}
