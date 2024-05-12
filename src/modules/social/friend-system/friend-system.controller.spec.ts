import { Test, TestingModule } from '@nestjs/testing';
import { FriendSystemController } from './friend-system.controller';

describe('FriendSystemController', () => {
  let controller: FriendSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendSystemController],
    }).compile();

    controller = module.get<FriendSystemController>(FriendSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
