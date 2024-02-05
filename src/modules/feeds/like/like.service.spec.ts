import { Test, TestingModule } from '@nestjs/testing';
import { LikeServiceUnstable } from './services/unstable/like.unstable.service';

describe('LikeService', () => {
  let service: LikeServiceUnstable;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeServiceUnstable],
    }).compile();

    service = module.get<LikeServiceUnstable>(LikeServiceUnstable);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
