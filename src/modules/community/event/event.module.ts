import { Module } from '@nestjs/common';
import { EventServiceUnstable } from './services/unstable/event.unstable.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entities/event.entity';

@Module({
  controllers: [EventController],
  providers: [EventServiceUnstable],
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
})
export class EventModule {}
