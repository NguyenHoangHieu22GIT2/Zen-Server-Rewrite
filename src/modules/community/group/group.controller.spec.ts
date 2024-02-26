import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupServiceUnstable, GroupServiceStable } from './services//';

describe('GroupController', () => {
  let controller: GroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [GroupServiceUnstable, GroupServiceStable],
    }).compile();

    controller = module.get<GroupController>(GroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
