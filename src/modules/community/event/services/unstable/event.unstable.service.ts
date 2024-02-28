import { Inject, Injectable } from '@nestjs/common';
import { IEventServiceUnstable } from './event.unstable.interface';
import {
  IEventServiceStable,
  IEventServiceStableString,
} from '../stable/event.stable.interface';

@Injectable()
export class EventServiceUnstable implements IEventServiceUnstable {
  constructor(
    @Inject(IEventServiceStableString)
    private readonly eventServiceStable: IEventServiceStable,
  ) {}
}
