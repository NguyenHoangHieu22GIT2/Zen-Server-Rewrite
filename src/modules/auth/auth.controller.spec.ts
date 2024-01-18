import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthServiceStable } from './stable/auth.stable.service';
import { AuthServiceUnstable } from './unstable/auth.unstable.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, Mongoose, connect, mongo } from 'mongoose';
import {
  EndUser,
  EndUserSchema,
} from '../users/enduser/entities/enduser.entity';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { v4 } from 'uuid';

describe('AuthController', () => {
  let controller: AuthController;
  let mongod: typeof mongoose;
  let id: string;
  let userToTest: Partial<EndUser>;

  beforeAll(async () => {
    mongod = await connect(process.env.DB_URL, { dbName: 'Zen-Test' });
    id = v4();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceStable, AuthServiceUnstable],
      imports: [
        MongooseModule.forRoot(process.env.DB_URL, { dbName: 'Zen-Test' }),
        MongooseModule.forFeature([
          { name: EndUser.name, schema: EndUserSchema },
        ]),
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterAll(() => {
    mongod.connection.db.dropDatabase();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await controller.registerAccount({
      email: `test@test.com`,
      gender: 'male',
      password: 'SonGoku@1',
      username: 'test',
    });
    userToTest = user.toObject();
    expect(user.toObject()).toBeDefined();
  });

  it('should activate the user', async () => {
    const user = await controller.activateAccount({
      activationToken: userToTest.activationToken,
    });
    expect(user).toBeDefined();
  });

  it('should forget the password', async () => {
    const user = await controller.forgotPassword({ email: userToTest.email });
    userToTest = user;
    expect(user).toBeDefined();
  });

  it('should change forgotPassword', async () => {
    const user = await controller.changeForgottonPassword({
      password: 'SonGoku@2',
      modifyToken: userToTest.modifyToken,
    });
    expect(user).toBeDefined();
  });
});
