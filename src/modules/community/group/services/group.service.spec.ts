import { Test, TestingModule } from '@nestjs/testing';
import { Group } from '../entities';
import mongoose from 'mongoose';
import { EndUserId, GroupId, MockedMethods } from 'src/common/types/utilTypes';
import { GroupServiceStable } from './stable/group.stable.service';
import { IGroupServiceStableString } from './stable/group.stable.interface';
import { InternalServerErrorException } from '@nestjs/common';
import { GroupService } from './group.service';

describe('groupUnstableService', () => {
  let service: GroupService;
  let mockupStableService: MockedMethods<GroupServiceStable>;
  const testEndUserId = new mongoose.Types.ObjectId() as EndUserId;
  const testGroupId = new mongoose.Types.ObjectId() as GroupId;
  const testGroup: Partial<Group> = {
    _id: new mongoose.Types.ObjectId() as GroupId,
    name: 'Group Dog of Thong',
    avatar: '',
    endUserId: testEndUserId,
    isVisible: true,
    description: 'Nothing special, just Thong dogs',
  };
  const fulfilledGroup: Partial<Group> = {
    _id: new mongoose.Types.ObjectId() as GroupId,
    name: 'Group Dog of Thong',
    avatar: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    endUserId: testEndUserId,
    isVisible: true,
    description: 'Nothing special, just Thong dogs',
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockupStableService = {
      createGroup: jest.fn(),
      findGroup: jest.fn(),
      getGroups: jest.fn(),
      deleteGroup: jest.fn(),
      saveGroup: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: IGroupServiceStableString,
          useValue: mockupStableService,
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create group:', () => {
    it('successfully', async () => {
      mockupStableService.createGroup.mockResolvedValue(fulfilledGroup);
      const result = await service.createGroup(
        testGroup.endUserId,
        testGroup as any,
      );
      // expect(mockupStableService.createGroup).toHaveBeenCalled();
      expect(result).toBe(fulfilledGroup);
    });
    it('failed', async () => {
      const result = await service.createGroup(testGroup.endUserId, {} as any);
      expect(mockupStableService.createGroup).toHaveBeenCalled();
      expect(result).not.toBe(fulfilledGroup);
    });
  });

  describe('find group:', () => {
    it('successfully', async () => {
      mockupStableService.findGroup.mockImplementation(() => fulfilledGroup);
      const result = await service.findGroup(testGroupId);
      expect(mockupStableService.findGroup).toHaveBeenCalled();
      expect(result).toBe(fulfilledGroup);
    });
    it('failed', async () => {
      try {
        mockupStableService.findGroup.mockRejectedValue(
          new InternalServerErrorException('Something happended'),
        );
        await service.findGroup('' as any);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('get Groups', () => {
    it('successfully', async () => {
      mockupStableService.getGroups.mockResolvedValue([
        fulfilledGroup,
        fulfilledGroup,
        fulfilledGroup,
      ]);
      const result = await service.getGroups({ limit: 3, skip: 0 });
      expect(mockupStableService.getGroups).toHaveBeenCalled();
      expect(result).toStrictEqual([
        fulfilledGroup,
        fulfilledGroup,
        fulfilledGroup,
      ]);
    });

    it('failed', async () => {
      // TODO
    });
  });

  describe('delete group:', () => {
    it('sucessfully', async () => {
      mockupStableService.findGroup.mockResolvedValue(fulfilledGroup);
      const group = await service.deleteGroup(
        fulfilledGroup.endUserId,
        fulfilledGroup._id as GroupId,
      );
      expect(mockupStableService.findGroup).toHaveBeenCalled();
      expect(group).toBe(fulfilledGroup);
    });

    it('failed', async () => {
      try {
        await service.deleteGroup(
          fulfilledGroup.endUserId,
          fulfilledGroup._id as GroupId,
        );
      } catch (error) {
        expect(mockupStableService.findGroup).toHaveBeenCalled();
        expect(error).toBeDefined();
      }
    });
  });

  describe('modify group:', () => {
    it('sucessfully', async () => {
      mockupStableService.findGroup.mockResolvedValue(fulfilledGroup);
      const group = await service.modifyGroup(fulfilledGroup.endUserId, {
        avatar: '',
        description: 'This is the best thing ever',
        groupId: fulfilledGroup._id! as GroupId,
        isVisible: false,
        name: 'God Of Hieu',
      });
      expect(mockupStableService.findGroup).toHaveBeenCalled();
      expect(mockupStableService.saveGroup).toHaveBeenCalled();
      expect(group).toBe(fulfilledGroup);
    });
  });
});
