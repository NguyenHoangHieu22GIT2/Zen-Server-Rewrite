import { Test, TestingModule } from '@nestjs/testing';
import { GroupPostsService } from './group-posts.service';

describe('GroupPostsService', () => {
  let service: GroupPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupPostsService],
    }).compile();

    service = module.get<GroupPostsService>(GroupPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
