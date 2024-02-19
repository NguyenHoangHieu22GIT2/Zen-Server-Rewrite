import { Test, TestingModule } from '@nestjs/testing';
import { EnduserController } from './';
import { EnduserServiceUnstable } from './services/unstable/';
import mongoose from 'mongoose';
import { EndUser, EndUserSchema } from './';
import { connect } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { EnduserServiceStable } from './services/stable/';
import {
  checkToConvertToMongoIdOrThrowError,
  createFakeImage,
} from 'src/common/utils/';
import { RequestUser, EndUserId } from 'src/common/types/utilTypes/';
import { ChangeInformationDto } from './dto/';

import { faker } from '@faker-js/faker';
describe('EnduserController', () => {
  let controller: EnduserController;
  let mongod: typeof mongoose;
  // let id: string;
  let userToTest: Partial<EndUser>;
  let fakeRequestUser: Partial<RequestUser>;

  beforeAll(async () => {
    mongod = await connect('mongodb://127.0.0.1:27017/', {
      dbName: 'Zen-Test',
    });
    userToTest = (await mongod.connection.db
      .collection('endusers')
      .findOne()) as any;
    // id = v4();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnduserController],
      providers: [EnduserServiceUnstable, EnduserServiceStable],
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/', {
          dbName: 'Zen-Test',
        }),
        MongooseModule.forFeature([
          { name: EndUser.name, schema: EndUserSchema },
        ]),
      ],
    }).compile();

    controller = module.get<EnduserController>(EnduserController);
  });

  afterAll(() => {
    // mongod.connection.db.dropDatabase();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find a user', async () => {
    console.log(userToTest);
    const user = await controller.findOne({
      id: checkToConvertToMongoIdOrThrowError<EndUserId>({
        id: userToTest._id.toString(),
        returnError: false,
      }),
    });
    userToTest = user;

    fakeRequestUser = {
      user: {
        _id: userToTest._id,
        avatar: userToTest.avatar,
        username: userToTest.username,
      },
    };
    expect(user).toBeDefined();
  });

  it("should change user's avatar", async () => {
    const image = createFakeImage();
    const user = await controller.changeAvatar(image, fakeRequestUser as any);
    expect(user).toBeDefined();
  });

  it("should change user's information", async () => {
    const changeInformationDto: ChangeInformationDto = {
      username: faker.internet.userName(),
      gender: 'male',
      description: faker.lorem.paragraph(),
    };

    const user = await controller.changeInformation(
      changeInformationDto,
      fakeRequestUser as any,
    );
    expect(user).toBeDefined();
  });
});
