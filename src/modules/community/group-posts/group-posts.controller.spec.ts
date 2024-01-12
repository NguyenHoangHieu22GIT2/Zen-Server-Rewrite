import { Test, TestingModule } from '@nestjs/testing';
import { GroupPostsController } from './group-posts.controller';
import { GroupPostsService } from './group-posts.service';

describe('GroupPostsController', () => {
  let controller: GroupPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupPostsController],
      providers: [GroupPostsService],
    }).compile();

    controller = module.get<GroupPostsController>(GroupPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
