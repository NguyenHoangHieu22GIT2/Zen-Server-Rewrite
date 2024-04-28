import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import {
  CommentId,
  EndUserId,
  MockedMethods,
  PostId,
} from 'src/common/types/utilTypes';
import { CommentServiceUnstable } from './comment.unstable.service';
import { CommentServiceStable } from '../stable';
import { Comment } from '../../entities';
import { ICommentStableServiceString } from '../stable/comment.stable.interface';

describe('Comment unstable service', () => {
  let service: CommentServiceUnstable;
  let mockupStableService: MockedMethods<CommentServiceStable>;
  const testEndUserId = new mongoose.Types.ObjectId() as EndUserId;

  const fulfilledComment: Comment = {
    endUserId: testEndUserId,
    _id: new mongoose.Types.ObjectId() as CommentId,
    content: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
    parentCommentId: new mongoose.Types.ObjectId() as CommentId,
    postId: new mongoose.Types.ObjectId() as PostId,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockupStableService = {
      getCommentsAggregate: jest.fn(),
      findCommentAggregate: jest.fn(),
      createComment: jest.fn(),
      findCommentById: jest.fn(),
      deleteComment: jest.fn(),
      saveComment: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentServiceUnstable,
        {
          provide: ICommentStableServiceString,
          useValue: mockupStableService,
        },
        // {
        //   provide: IPostServiceStableString,
        //   useValue: mockupStableService,
        // },
      ],
    }).compile();

    service = module.get<CommentServiceUnstable>(CommentServiceUnstable);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getComments', () => {
    it('should return comments', async () => {
      const comments = [fulfilledComment];
      mockupStableService.getCommentsAggregate.mockResolvedValue(comments);
      expect(
        await service.getComments({
          postId: new mongoose.Types.ObjectId() as PostId,
          skip: 0,
          limit: 10,
        }),
      ).toEqual(comments);
    });

    it('should fails to return comments', async () => {
      mockupStableService.getCommentsAggregate.mockRejectedValue(new Error());
      await expect(
        service.getComments({
          postId: new mongoose.Types.ObjectId() as PostId,
          skip: 0,
          limit: 10,
        }),
      ).rejects.toThrow();
    });
  });
  describe('findComment', () => {
    it('should return comment', async () => {
      const comment = fulfilledComment;
      mockupStableService.findCommentAggregate.mockResolvedValue(comment);
      expect(
        await service.findComment({
          commentId: new mongoose.Types.ObjectId() as CommentId,
        }),
      ).toEqual(comment);
    });
    it('should fail to return comment', async () => {
      mockupStableService.findCommentAggregate.mockRejectedValue(new Error());
      await expect(
        service.findComment({
          commentId: new mongoose.Types.ObjectId() as CommentId,
        }),
      ).rejects.toThrow();
    });
  });

  describe('createComment', () => {
    it('should create comment', async () => {
      const comment = fulfilledComment;
      mockupStableService.createComment.mockResolvedValue(comment);
      expect(
        await service.createComment({
          createCommentDto: {
            content: 'test',
            parentCommentId: new mongoose.Types.ObjectId() as CommentId,
            postId: new mongoose.Types.ObjectId() as PostId,
          },
          endUserId: testEndUserId,
        }),
      ).toEqual(comment);
    });
    it('should fail to create comment', async () => {
      mockupStableService.createComment.mockRejectedValue(new Error());
      await expect(
        service.createComment({
          createCommentDto: {
            content: 'test',
            parentCommentId: new mongoose.Types.ObjectId() as CommentId,
            postId: new mongoose.Types.ObjectId() as PostId,
          },
          endUserId: testEndUserId,
        }),
      ).rejects.toThrow();
    });
  });

  describe('modifyComment', () => {
    it('should modify comment', async () => {
      const comment = fulfilledComment;
      mockupStableService.findCommentById.mockResolvedValue(comment);
      expect(
        await service.modifyComment({
          modifyCommentDto: {
            commentId: new mongoose.Types.ObjectId() as CommentId,
            content: 'test',
            postId: new mongoose.Types.ObjectId() as PostId,
          },
          endUserId: testEndUserId,
        }),
      ).toEqual(comment);
    });
    it('should fail to modify comment', async () => {
      mockupStableService.findCommentById.mockRejectedValue(new Error());
      await expect(
        service.modifyComment({
          modifyCommentDto: {
            commentId: new mongoose.Types.ObjectId() as CommentId,
            content: 'test',
            postId: new mongoose.Types.ObjectId() as PostId,
          },
          endUserId: testEndUserId,
        }),
      ).rejects.toThrow();
    });
  });

  describe('deleteComment', () => {
    it('should delete comment', async () => {
      const comment = fulfilledComment;
      mockupStableService.findCommentById.mockResolvedValue(comment);
      expect(
        await service.deleteComment({
          findCommentDto: {
            commentId: new mongoose.Types.ObjectId() as CommentId,
          },
          endUserId: testEndUserId,
        }),
      ).toEqual(comment);
    });
    it('should fail to delete comment', async () => {
      mockupStableService.findCommentById.mockRejectedValue(new Error());
      await expect(
        service.deleteComment({
          findCommentDto: {
            commentId: new mongoose.Types.ObjectId() as CommentId,
          },
          endUserId: testEndUserId,
        }),
      ).rejects.toThrow();
    });
  });
});
