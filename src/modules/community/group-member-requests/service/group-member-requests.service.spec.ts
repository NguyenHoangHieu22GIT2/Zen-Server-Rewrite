import { Test, TestingModule } from '@nestjs/testing';
import { GroupMemberRequestsService } from './group-member-requests.service';

describe('GroupMemberRequestsService', () => {
  let service: GroupMemberRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupMemberRequestsService],
    }).compile();

    service = module.get<GroupMemberRequestsService>(GroupMemberRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
