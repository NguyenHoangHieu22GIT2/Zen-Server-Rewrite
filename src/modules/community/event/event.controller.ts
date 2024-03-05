import { Controller } from '@nestjs/common';
import { IEventServiceUnstable } from './services/unstable/event.unstable.interface';
import { ApiTags } from '@nestjs/swagger';
import { TryCatchForServiceClass } from 'src/cores/decorators/TryCatchForServiceClass.decorator';

@Controller('event')
@ApiTags('Event')
@TryCatchForServiceClass()
export class EventController {
  constructor(private readonly eventService: IEventServiceUnstable) {}
}
