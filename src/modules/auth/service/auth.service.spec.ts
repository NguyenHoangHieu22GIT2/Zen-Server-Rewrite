import { Test, TestingModule } from '@nestjs/testing';
import { EndUserId, MockedMethods } from 'src/common/types/utilTypes';
import { EndUser } from 'src/modules/users/enduser';
import mongoose from 'mongoose';
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { gender } from 'src/common/constants';
import { describe } from 'node:test';
import * as bcrypt from 'bcryptjs';
import { tryCatchForTest } from 'src/common/utils/tests/tryCatchForTest';
import { IAuthService } from './auth.interface';
import { AuthRepository } from '../repository/auth.repository';
describe('Auth Service Unstable', () => {
  let service: IAuthService;
  let mockupRepository: MockedMethods<AuthRepository>;
  const rawPassword = faker.internet.password();
  const hashedPassword = bcrypt.hashSync(rawPassword, 2);
  const testEndUser: EndUser & { save: () => any } = {
    _id: new mongoose.Types.ObjectId() as EndUserId,
    activationToken: v4(),
    avatar: faker.image.avatar(),
    createdAt: new Date(),
    description: faker.commerce.productDescription(),
    email: faker.internet.email(),
    expireTimeForModifyToken: faker.date.anytime(),
    gender: 'male',
    isBanned: false,
    isOnline: false,
    modifyToken: v4(),
    offlineTime: faker.date.anytime(),
    password: hashedPassword,
    restrict: [],
    updatedAt: faker.date.anytime(),
    username: faker.internet.userName(),
    save: function () {
      return this;
    },
  };
  beforeEach(async () => {
    jest.clearAllMocks();
    mockupRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthServiceUnstable,
        {
          provide: IAuthServiceStableString,
          useValue: mockupStableService,
        },
      ],
    }).compile();

    service = module.get<AuthServiceUnstable>(AuthServiceUnstable);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create account:', () => {
    it('is success', async () => {
      mockupStableService.create.mockResolvedValue(testEndUser);
      const endUser = await service.registerAccount({
        email: testEndUser.email,
        gender: testEndUser.gender as gender,
        password: testEndUser.password,
        username: testEndUser.username,
      });

      expect(mockupStableService.create).toHaveBeenCalled();
      expect(endUser).toBe(testEndUser);
    });

    it('is failed', async () => {
      await tryCatchForTest(async () => {
        mockupStableService.create.mockResolvedValue(null);
        const endUser = await service.registerAccount({
          email: testEndUser.email,
          gender: testEndUser.gender as gender,
          username: testEndUser.username,
          password: '',
        });
        expect(mockupStableService.create).toHaveBeenCalled();
        expect(endUser).not.toBe(testEndUser);
      });
    });
  });
  describe('activate the account', () => {
    it('is success', async () => {
      mockupStableService.findAccountFilterQuery.mockResolvedValue(testEndUser);
      const account = await service.activateAccount({
        activationToken: testEndUser.activationToken,
      });
      expect(mockupStableService.findAccountFilterQuery).toHaveBeenCalled();
      expect(account).toBe(testEndUser);
    });

    it('is failed', async () => {
      await tryCatchForTest(async () => {
        mockupStableService.findAccountFilterQuery.mockResolvedValue(null);
        const account = await service.activateAccount({
          activationToken: testEndUser.activationToken,
        });
        expect(mockupStableService.findAccountFilterQuery).toHaveBeenCalled();
        expect(account).not.toBe(testEndUser);
      });
    });
  });
  describe('Login:', () => {
    it('will success', async () => {
      mockupStableService.findAccountFilterQuery.mockResolvedValue(testEndUser);
      const user = await service.loginAccount({
        email: testEndUser.email,
        password: rawPassword,
      });
      expect(mockupStableService.findAccountFilterQuery).toHaveBeenCalled();
      expect(user).toBe(testEndUser);
    });

    it('will fail (not activate)', async () => {
      await tryCatchForTest(async () => {
        const user = await service.loginAccount({
          email: testEndUser.email,
          password: rawPassword,
        });
        expect(mockupStableService.findAccountFilterQuery).toHaveBeenCalled();
        expect(user).not.toBe(testEndUser);
      });
    });
  });

  describe('forgot password:', () => {
    it('will success', async () => {
      const oldModifyToken = testEndUser.modifyToken;
      mockupStableService.findAccountFilterQuery.mockResolvedValue(testEndUser);

      const user = await service.forgotPassword({ email: testEndUser.email });

      expect(mockupStableService.findAccountFilterQuery).toHaveBeenCalled();
      expect(user.modifyToken).not.toMatch(oldModifyToken);
    });

    it('will fail', async () => {
      await tryCatchForTest(async () => {
        mockupStableService.findAccountFilterQuery.mockResolvedValue(null);
        const user = await service.forgotPassword({ email: testEndUser.email });
        expect(mockupStableService.findAccountFilterQuery).toHaveBeenCalled();
        expect(user).not.toBe(testEndUser);
      });
    });
  });

  describe('change forgotton password', () => {
    it('will success', async () => {
      mockupStableService.findAccountFilterQuery.mockResolvedValue(testEndUser);
      const endUser = await service.changeForgottonPassword({
        modifyToken: testEndUser.modifyToken,
        password: 'newPasswrod',
      });
      expect(mockupStableService.findAccountFilterQuery).toHaveBeenCalled();

      expect(endUser).toBe(testEndUser);
    });

    it('will fail', async () => {
      await tryCatchForTest(async () => {
        mockupStableService.findAccountFilterQuery.mockResolvedValue(null);

        const endUser = await service.changeForgottonPassword({
          modifyToken: testEndUser.modifyToken,
          password: 'newPasswrod',
        });

        expect(mockupStableService.findAccountFilterQuery).toHaveBeenCalled();

        expect(endUser).toBe(testEndUser);
      });
    });
  });
});
