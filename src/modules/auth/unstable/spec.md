import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceUnstable } from './auth.unstable.service';
import { AuthServiceStable } from '../stable/auth.stable.service';
import { EnduserModule } from 'src/modules/users/enduser/enduser.module';
import {
  EndUser,
  EndUserSchema,
} from 'src/modules/users/enduser/entities/enduser.entity';
import { Mongoose, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { RegisterEndUserDto } from '../dto/register-end-user.dto';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

describe('AuthService', () => {
  let authServiceUnstable: AuthServiceUnstable;
  let fakeAuthServiceStable: Partial<AuthServiceStable>;

  beforeEach(async () => {
    const endusers: EndUser[] = [
      {
        _id: new Types.ObjectId('65a7400bc64a74aa8464bf8d'),
        email: 'test@test.com',
        avatar: 'this_image.png',
        gender: 'male',
        isBanned: false,
        isOnline: false,
        password:
          '$2a$04$G1vUt6BHgHh7q3hW9wZ5neeqpKq5jJICK0PbX2pP8HGQ3uubODq7O',
        restrict: [],
        username: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        modifyToken: '',
        offlineTime: new Date(),
        activationToken: '',
      },
      {
        _id: new Types.ObjectId('65a7400bc64a74aa8464bf81'),
        email: 'test1@test.com',
        avatar: 'this_image1.png',
        gender: 'male',
        isBanned: false,
        isOnline: false,
        password:
          '$2a$04$sOa3eauuc4Fs/jtrff3Vae2r65wxYDo.NxTyXMPtn.1uztZji.8km',
        restrict: [],
        username: 'test1',
        createdAt: new Date(),
        updatedAt: new Date(),
        modifyToken: '',
        offlineTime: new Date(),
        activationToken: '',
      },
      {
        _id: new Types.ObjectId('65a7400bc64a74aa8464bf82'),
        email: 'test2@test.com',
        avatar: 'this_image2.png',
        gender: 'male',
        isBanned: false,
        isOnline: false,
        password:
          '$2a$04$G1vUt6BHgHh7q3hW9wZ5neeqpKq5jJICK0PbX2pP8HGQ3uubODq7O',
        restrict: [],
        username: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        modifyToken: '',
        offlineTime: new Date(),
        activationToken: '',
      },
      {
        _id: new Types.ObjectId('65a7400bc64a74aa8464bf83'),
        email: 'test3@test.com',
        avatar: 'this_image3.png',
        gender: 'male',
        isBanned: false,
        isOnline: false,
        password:
          '$2a$04$G1vUt6BHgHh7q3hW9wZ5neeqpKq5jJICK0PbX2pP8HGQ3uubODq7O',
        restrict: [],
        username: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        modifyToken: '',
        offlineTime: new Date(),
        activationToken: '',
      },
    ];

    fakeAuthServiceStable = {
      checkLoginAccount(loginEndUserDto) {
        const user = endusers.find(
          (endUser) => endUser.email === loginEndUserDto.email,
        );
        return Promise.resolve(user);
      },
      checkRegisteredAccount(email, message) {
        const user = endusers.find((endUser) => endUser.email === email);
        console.log(user);
        return Promise.resolve();
      },
      checkAccountIfNotExistThenThrowError({ message, filterQuery }) {
        return Promise.resolve(endusers[0] as DocumentMongodbType<EndUser>);
      },
      checkAccountIfAlreadyExistThenThrowError({ filterQuery, message }) {
        return Promise.resolve(endusers[0] as DocumentMongodbType<EndUser>);
      },
      async checkPasswordAndThrowErrorIfNotMatch(password, hashedPassword) {
        const doMatch = await bcrypt.compare(password, hashedPassword);

        if (!doMatch) {
          throw new Error('Wrong password');
        }
        return Promise.resolve(doMatch);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthServiceUnstable,
        { provide: AuthServiceStable, useValue: fakeAuthServiceStable },
        {
          provide: getModelToken(EndUser.name),
          useValue: EndUser,
        },
      ],
    }).compile();

    authServiceUnstable = module.get<AuthServiceUnstable>(AuthServiceUnstable);
  });

  it('should be defined', () => {
    expect(authServiceUnstable).toBeDefined();
  });

  it('should register', async () => {
    const createEndUserDto: RegisterEndUserDto = {
      username: 'thisisatest',
      password: '123',
      email: 'thisisatest@gmail.com',
      gender: 'male',
    };
    console.log(authServiceUnstable);
    const user = await authServiceUnstable.registerAccount(createEndUserDto);
    expect(user._id).toBeDefined();
  });
});
