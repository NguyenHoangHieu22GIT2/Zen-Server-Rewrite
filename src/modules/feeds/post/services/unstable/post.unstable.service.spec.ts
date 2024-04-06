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

  const fulfilledPost: Post & { save: () => any; deleteOne: () => any } = {
    title: 'Hello everyone',
    body: 'This is me, mario :)))))',
    _id: new mongoose.Types.ObjectId() as PostId,
    views: 0,
    images: [],
    createdAt: new Date(),
    endUserId: testEndUserId,
    updatedAt: new Date(),
    save: function () {
      return this;
    },
    deleteOne: function () {
      return this;
    },
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

    it('failed', async () => {
      mockupStableService.createPost.mockRejectedValue(new Error());
      await expect(
        service.createPost({
          endUserId: testEndUserId,
          imageNames: [],
          createPostDto: postCreated,
        }),
      ).rejects.toThrowError();
    });
  });

  describe('find post:', () => {
    it('succeed', async () => {
      mockupStableService.findPostAggregation.mockResolvedValue(fulfilledPost);
      const post = await service.findPost({ postId: fulfilledPost._id });

      expect(mockupStableService.findPostAggregation).toHaveBeenCalled();
      expect(post.title).toBe(fulfilledPost.title);
      expect(post.body).toBe(fulfilledPost.body);
    });

    it('failed', async () => {
      mockupStableService.findPostAggregation.mockRejectedValue(new Error());
      await expect(
        service.findPost({ postId: fulfilledPost._id }),
      ).rejects.toThrowError();
    });
  });

  describe('get user posts:', () => {
    it('succeed', async () => {
      mockupStableService.getPostsAggregation.mockResolvedValue([
        fulfilledPost,
      ]);
      const posts = await service.getUserPosts({
        endUserId: testEndUserId,
        getUserPostsDto: { limit: 10, skip: 0, endUserId: testEndUserId },
      });

      expect(mockupStableService.getPostsAggregation).toHaveBeenCalled();
      expect(posts[0].title).toBe(fulfilledPost.title);
      expect(posts[0].body).toBe(fulfilledPost.body);
    });

    it('failed', async () => {
      mockupStableService.getPostsAggregation.mockRejectedValue(new Error());
      await expect(
        service.getUserPosts({
          endUserId: testEndUserId,
          getUserPostsDto: { limit: 10, skip: 0, endUserId: testEndUserId },
        }),
      ).rejects.toThrowError();
    });
  });

  describe('get posts aggregation:', () => {
    it('succeed', async () => {
      mockupStableService.getPostsAggregation.mockResolvedValue([
        fulfilledPost,
      ]);
      const posts = await service.getPostsAggregation({
        queryLimitSkip: { limit: 10, skip: 0 },
        pipelineStages: [{ $match: { endUserId: testEndUserId } }],
      });

      expect(mockupStableService.getPostsAggregation).toHaveBeenCalled();
      expect(posts[0].title).toBe(fulfilledPost.title);
      expect(posts[0].body).toBe(fulfilledPost.body);
    });

    it('failed', async () => {
      mockupStableService.getPostsAggregation.mockRejectedValue(new Error());
      await expect(
        service.getPostsAggregation({
          queryLimitSkip: { limit: 10, skip: 0 },
          pipelineStages: [{ $match: { endUserId: testEndUserId } }],
        }),
      ).rejects.toThrowError();
    });
  });

  describe('get recommended posts:', () => {
    it('succeed', async () => {
      mockupStableService.getPostsAggregation.mockResolvedValue([
        fulfilledPost,
      ]);
      const posts = await service.getRecommendedPosts({
        queryLimitSkip: { limit: 10, skip: 0 },
        endUserId: testEndUserId,
      });

      expect(mockupStableService.getPostsAggregation).toHaveBeenCalled();
      expect(posts[0].title).toBe(fulfilledPost.title);
      expect(posts[0].body).toBe(fulfilledPost.body);
    });

    it('failed', async () => {
      mockupStableService.getPostsAggregation.mockRejectedValue(new Error());
      await expect(
        service.getRecommendedPosts({
          queryLimitSkip: { limit: 10, skip: 0 },
          endUserId: testEndUserId,
        }),
      ).rejects.toThrowError();
    });
  });

  describe('modify post:', () => {
    it('succeed', async () => {
      mockupStableService.findPostById.mockResolvedValue(fulfilledPost);
      mockupStableService.createPost.mockResolvedValue(fulfilledPost);
      const post = await service.modifyPost({
        endUserId: testEndUserId,
        images: [],
        modifyPostDto: { postId: fulfilledPost._id, ...postCreated },
      });

      expect(mockupStableService.findPostById).toHaveBeenCalled();
      expect(post.title).toBe(postCreated.title);
      expect(post.body).toBe(postCreated.body);
    });

    it('failed', async () => {
      mockupStableService.findPostById.mockRejectedValue(new Error());
      await expect(
        service.modifyPost({
          endUserId: testEndUserId,
          images: [],
          modifyPostDto: { postId: fulfilledPost._id, ...postCreated },
        }),
      ).rejects.toThrowError();
    });
  });

  describe('delete post:', () => {
    it('succeed', async () => {
      mockupStableService.findPostById.mockResolvedValue(fulfilledPost);
      const post = await service.deletePost({
        endUserId: testEndUserId,
        postId: fulfilledPost._id,
      });

      expect(mockupStableService.findPostById).toHaveBeenCalled();
      expect(post.title).toBe(fulfilledPost.title);
      expect(post.body).toBe(fulfilledPost.body);
    });

    it('failed', async () => {
      mockupStableService.findPostById.mockRejectedValue(new Error());
      await expect(
        service.deletePost({
          endUserId: testEndUserId,
          postId: fulfilledPost._id,
        }),
      ).rejects.toThrowError();
    });
  });
});
