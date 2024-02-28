import { Controller, Inject } from '@nestjs/common';
import {
  IEventServiceUnstable,
  IEventServiceUnstableString,
} from './services/unstable/event.unstable.interface';
import { ApiTags } from '@nestjs/swagger';
import { TryCatchForServiceClass } from 'src/cores/decorators/TryCatchForServiceClass.decorator';

@Controller('event')
@ApiTags('Event')
@TryCatchForServiceClass()
export class EventController {
  constructor(
    @Inject(IEventServiceUnstableString)
    private readonly eventService: IEventServiceUnstable,
  ) {}
}
