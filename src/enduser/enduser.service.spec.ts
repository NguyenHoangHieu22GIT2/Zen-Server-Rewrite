import { Test, TestingModule } from '@nestjs/testing';
import { EnduserService } from './enduser.service';

describe('EnduserService', () => {
  let service: EnduserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnduserService],
    }).compile();

    service = module.get<EnduserService>(EnduserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
