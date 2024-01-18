import { Test, TestingModule } from '@nestjs/testing';
import { EnduserServiceUnstable } from './services/enduser.unstable.service';

describe('EnduserServiceUnstable', () => {
  let service: EnduserServiceUnstable;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnduserServiceUnstable],
    }).compile();

    service = module.get<EnduserServiceUnstable>(EnduserServiceUnstable);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
