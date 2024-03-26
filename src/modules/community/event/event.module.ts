import { Module } from '@nestjs/common';
import { EventServiceUnstable } from './services/unstable/event.unstable.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entities/event.entity';
import { EventServiceStable } from './services';
import { IEventServiceStableString } from './services/stable/event.stable.interface';
import { IEventServiceUnstableString } from './services/unstable/event.unstable.interface';
import { GroupModule } from '../group';
import { GroupMembersModule } from '../group-members';

@Module({
  controllers: [EventController],
  providers: [
    {
      useClass: EventServiceUnstable,
      provide: IEventServiceUnstableString,
    },
    {
      useClass: EventServiceStable,
      provide: IEventServiceStableString,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    GroupModule,
    GroupMembersModule,
  ],
  exports: [
    {
      useClass: EventServiceUnstable,
      provide: IEventServiceUnstableString,
    },
    {
      useClass: EventServiceStable,
      provide: IEventServiceStableString,
    },
  ],
})
export class EventModule {}
