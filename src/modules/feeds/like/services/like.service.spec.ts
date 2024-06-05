import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import {
  EndUserId,
  LikeId,
  MockedMethods,
  PostId,
} from 'src/common/types/utilTypes';
import { LikeServiceUnstable } from './like.unstable.service';
import { Like } from '../../entities';
import { LikeServiceStable } from '../stable';
import { ILikeServiceStableString } from '../stable/like.stable.interface';

describe('Like unstable service', () => {
  let service: LikeServiceUnstable;
  let mockupStableService: MockedMethods<LikeServiceStable>;
  const testEndUserId = new mongoose.Types.ObjectId() as EndUserId;

  const fulfilledLike: Like & { save: () => any; deleteOne: () => any } = {
    endUserId: testEndUserId,
    _id: new mongoose.Types.ObjectId() as LikeId,
    postId: new mongoose.Types.ObjectId() as PostId,
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
      getLikes: jest.fn(),
      getNumberOfLikes: jest.fn(),
      findLike: jest.fn(),
      createLike: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeServiceUnstable,
        {
          provide: ILikeServiceStableString,
          useValue: mockupStableService,
        },
        // {
        //   provide: IPostServiceStableString,
        //   useValue: mockupStableService,
        // },
      ],
    }).compile();

    service = module.get<LikeServiceUnstable>(LikeServiceUnstable);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNumberOfLikes', () => {
    it('should return number of likes', async () => {
      mockupStableService.getNumberOfLikes.mockResolvedValueOnce(1);
      const result = await service.getNumberOfLikes(
        new mongoose.Types.ObjectId() as PostId,
      );
      expect(result).toBe(1);
    });
    it('should fail to return number of likes', async () => {
      mockupStableService.getNumberOfLikes.mockRejectedValueOnce(new Error());
      await expect(
        service.getNumberOfLikes(new mongoose.Types.ObjectId() as PostId),
      ).rejects.toThrowError();
    });
  });

  describe('getLikes', () => {
    it('should return likes', async () => {
      mockupStableService.getLikes.mockResolvedValueOnce([fulfilledLike]);
      const result = await service.getLikes({
        postId: new mongoose.Types.ObjectId() as PostId,
        queryLimitSkip: { limit: 1, skip: 0 },
      });
      expect(result).toEqual([fulfilledLike]);
    });
    it('should fail to return likes', async () => {
      mockupStableService.getLikes.mockRejectedValueOnce(new Error());
      await expect(
        service.getLikes({
          postId: new mongoose.Types.ObjectId() as PostId,
          queryLimitSkip: { limit: 1, skip: 0 },
        }),
      ).rejects.toThrowError();
    });
  });

  describe('toggleLike', () => {
    it('should create like', async () => {
      mockupStableService.findLike.mockResolvedValueOnce(null);
      mockupStableService.createLike.mockResolvedValueOnce(fulfilledLike);
      const result = await service.toggleLike({
        postId: new mongoose.Types.ObjectId() as PostId,
        endUserId: testEndUserId,
      });
      expect(result).toEqual(fulfilledLike);
    });
    it('should delete like', async () => {
      mockupStableService.findLike.mockResolvedValueOnce(fulfilledLike);
      const result = await service.toggleLike({
        postId: new mongoose.Types.ObjectId() as PostId,
        endUserId: testEndUserId,
      });
      expect(result).toEqual(fulfilledLike);
    });
    it('should fail to toggle like', async () => {
      mockupStableService.findLike.mockRejectedValueOnce(new Error());
      await expect(
        service.toggleLike({
          postId: new mongoose.Types.ObjectId() as PostId,
          endUserId: testEndUserId,
        }),
      ).rejects.toThrowError();
    });
  });
});
