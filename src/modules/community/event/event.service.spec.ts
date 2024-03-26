import { Test, TestingModule } from '@nestjs/testing';
import { EventServiceUnstable, EventServiceStable } from './services/';
import { IEventServiceStableString } from './services/stable/event.stable.interface';

describe('EventService', () => {
  let service: EventServiceUnstable;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventServiceUnstable,
        {
          provide: IEventServiceStableString,
          useClass: EventServiceStable,
        },
      ],
    }).compile();

    service = module.get<EventServiceUnstable>(EventServiceUnstable);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
