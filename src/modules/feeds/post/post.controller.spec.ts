import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostServiceUnstable } from './services/unstable/post.unstable.service';
import mongoose, { connect } from 'mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { PostServiceStable } from './services/stable/post.stable.service';
import { MongooseModule } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';
import { RequestUser } from 'src/common/types/utilTypes/RequestUser';
import { createFakeImage } from 'src/common/utils/createFakeImage';
import { PostRedisStableService } from './services/stable/post.redis.stable.service';

describe('PostController', () => {
  let controller: PostController;
  let mongod: typeof mongoose;
  // let id: string;
  let userToTest: Partial<EndUser>;
  let fakeRequestUser: Partial<RequestUser>;
  let postToTest: Post;

  beforeAll(async () => {
    mongod = await connect('mongodb://127.0.0.1:27017/', {
      dbName: 'Zen-Test',
    });
    userToTest = (await mongod.connection.db
      .collection('endusers')
      .findOne()) as any;
    // id = v4();
    fakeRequestUser = {
      user: {
        _id: userToTest._id,
        avatar: userToTest.avatar,
        username: userToTest.username,
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        PostServiceUnstable,
        PostServiceStable,
        PostRedisStableService,
      ],
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/', {
          dbName: 'Zen-Test',
        }),
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  afterAll(() => {
    // mongod.connection.db.dropDatabase();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a post', async () => {
    const image = createFakeImage();
    const post = await controller.createPost(
      {
        title: faker.lorem.sentence(100),
        body: faker.lorem.paragraph(15),
      },
      fakeRequestUser as any,
      [image],
    );
    postToTest = post;
    expect(post).toBeDefined();
  });

  it("should get user's posts", async () => {
    const posts = await controller.getUserPosts(fakeRequestUser as any, {
      endUserId: userToTest._id,
      limit: 10,
      skip: 0,
    });
    expect(posts).toBeDefined();
  });

  it('should get recommend posts', async () => {
    const posts = await controller.getRecommendedPosts(fakeRequestUser as any, {
      limit: 10,
      skip: 0,
    });
    expect(posts).toBeDefined();
  });

  it('should get one post', async () => {
    const post = await controller.getPost(fakeRequestUser as any, {
      postId: postToTest._id,
    });
    expect(post).toBeDefined();
  });

  it('should be able to modify a post', async () => {
    const title = faker.color.human();
    const body = faker.lorem.paragraph(5);
    const image = createFakeImage();
    const post = await controller.modifyPost(
      fakeRequestUser as any,
      {
        postId: postToTest._id,
        title,
        body,
      },
      [image],
    );
    expect(post.title).toEqual(title);
  });

  it('should delete a post', async () => {
    const post = await controller.deletePost(fakeRequestUser as any, {
      postId: postToTest._id,
    });
    expect(post).toBeDefined();
  });
});
