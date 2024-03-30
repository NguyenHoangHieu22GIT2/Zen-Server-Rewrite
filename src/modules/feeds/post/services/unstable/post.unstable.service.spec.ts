import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { EndUserId, MockedMethods, PostId } from 'src/common/types/utilTypes';
import { PostServiceUnstable } from './post.unstable.service';
import {
  IPostServiceStable,
  IPostServiceStableString,
} from '../stable/post.stable.interface';
import { CreatePostDto } from '../../dto';
import { Post } from '../../entities';

describe('groupUnstableService', () => {
  let service: PostServiceUnstable;
  let mockupStableService: MockedMethods<IPostServiceStable>;
  const testEndUserId = new mongoose.Types.ObjectId() as EndUserId;

  const postCreated: CreatePostDto = {
    title: 'Hello everyone',
    body: 'This is me, mario :)))))',
  };

  const fulfilledPost: Post = {
    title: 'Hello everyone',
    body: 'This is me, mario :)))))',
    _id: new mongoose.Types.ObjectId() as PostId,
    views: 0,
    images: [],
    createdAt: new Date(),
    endUserId: testEndUserId,
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockupStableService = {
      getPostsAggregation: jest.fn(),
      createPost: jest.fn(),
      findPostById: jest.fn(),
      findPostAggregation: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostServiceUnstable,
        {
          provide: IPostServiceStableString,
          useValue: mockupStableService,
        },
      ],
    }).compile();

    service = module.get<PostServiceUnstable>(PostServiceUnstable);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create post:', () => {
    it('succeed', async () => {
      mockupStableService.createPost.mockResolvedValue(fulfilledPost);
      const post = await service.createPost({
        endUserId: testEndUserId,
        imageNames: [],
        createPostDto: postCreated,
      });

      expect(mockupStableService.createPost).toHaveBeenCalled();
      expect(post.title).toBe(postCreated.title);
      expect(post.body).toBe(postCreated.body);
    });
  });
});
