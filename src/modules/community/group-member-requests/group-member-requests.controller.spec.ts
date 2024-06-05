import { Test, TestingModule } from '@nestjs/testing';
import { GroupMemberRequestsController } from './group-member-requests.controller';
import { GroupMemberRequestsService } from './service/group-member-requests.service';

describe('GroupMemberRequestsController', () => {
  let controller: GroupMemberRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupMemberRequestsController],
      providers: [GroupMemberRequestsService],
    }).compile();

    controller = module.get<GroupMemberRequestsController>(
      GroupMemberRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
