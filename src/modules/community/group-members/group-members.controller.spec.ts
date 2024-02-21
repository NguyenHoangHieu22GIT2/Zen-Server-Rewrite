import { Test, TestingModule } from '@nestjs/testing';
import { GroupMembersController } from './group-members.controller';
import {
  GroupMembersServiceStable,
  GroupMembersServiceUnstable,
} from './services';

describe('GroupMembersController', () => {
  let controller: GroupMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupMembersController],
      providers: [GroupMembersServiceUnstable, GroupMembersServiceStable],
    }).compile();

    controller = module.get<GroupMembersController>(GroupMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
