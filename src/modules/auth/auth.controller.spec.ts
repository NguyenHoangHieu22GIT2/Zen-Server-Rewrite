import { Test, TestingModule } from '@nestjs/testing';
import {
  AuthServiceUnstable,
  AuthServiceStable,
  AuthController,
  AuthRedisStableService,
} from './';
import { connect } from 'mongoose';
import { EndUser, EndUserSchema } from 'src/modules/users/enduser/';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { v4 } from 'uuid';

describe('AuthController', () => {
  let controller: AuthController;
  // Did get used down there but doesn't get recognized by eslint :(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let mongod: typeof mongoose;
  let id: string;
  let userToTest: Partial<EndUser>;

  beforeAll(async () => {
    console.log(process.env.DB_URL);
    mongod = await connect(process.env.DB_URL, { dbName: 'Zen-Test' });
    id = v4();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthServiceStable,
        AuthServiceUnstable,
        AuthRedisStableService,
      ],
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
    // NEVER USE THIS, INSTEAD USE dropCollection if need to delete data
    // mongod.connection.db.dropDatabase();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await controller.registerAccount({
      email: `test${id}@test.com`,
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
