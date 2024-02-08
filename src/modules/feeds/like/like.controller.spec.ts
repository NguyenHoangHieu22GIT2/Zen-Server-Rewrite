import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from './like.controller';
import { LikeServiceUnstable } from './services/unstable/like.unstable.service';
import { LikeServiceStable } from './services/stable/like.stable.service';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';
import { RequestUser } from 'src/common/types/utilTypes/RequestUser';
import { Post } from '../post/entities/post.entity';
import { FindOneForTest } from 'src/common/tests/findOneForTest';

import { Like, LikeSchema } from './entities/like.entity';
import { importMongooseModuleForTesting } from 'src/common/utils/importMongooseModuleForTesting';

describe('LikeController', () => {
  let controller: LikeController;
  let userToTest: Partial<EndUser>;
  let fakeRequestUser: Partial<RequestUser>;
  let postToTest: Post;
  beforeEach(async () => {
    userToTest = await FindOneForTest('endusers');
    fakeRequestUser = {
      user: {
        _id: userToTest._id,
        avatar: userToTest.avatar,
        username: userToTest.username,
      },
    };
    postToTest = await FindOneForTest('posts');
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [LikeServiceUnstable, LikeServiceStable],
      imports: [...importMongooseModuleForTesting(Like.name, LikeSchema)],
    }).compile();

    controller = module.get<LikeController>(LikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should toggle like', async () => {
    const like = await controller.toggleLike(fakeRequestUser as any, {
      postId: postToTest._id,
    });
    expect(like).toBeDefined();
  });
});
