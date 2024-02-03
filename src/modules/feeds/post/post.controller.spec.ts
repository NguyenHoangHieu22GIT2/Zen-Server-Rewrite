import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostServiceUnstable } from './services/unstable/post.unstable.service';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostServiceUnstable],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
