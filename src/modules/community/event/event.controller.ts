import { Controller } from '@nestjs/common';
import { EventServiceUnstable } from './services/unstable/event.unstable.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventServiceUnstable) {}
}
