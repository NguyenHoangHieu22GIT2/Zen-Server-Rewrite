import { Types } from 'mongoose';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

export const EndUserDtoStub = (): EndUser => {
  return {
    _id: new Types.ObjectId('65a7400bc64a74aa8464bf8d') as EndUserId,
    email: 'test@test.com',
    avatar: 'this_image.png',
    gender: 'male',
    isBanned: false,
    isOnline: false,
    password: '$2a$04$G1vUt6BHgHh7q3hW9wZ5neeqpKq5jJICK0PbX2pP8HGQ3uubODq7O',
    restrict: [],
    username: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
    modifyToken: '',
    offlineTime: new Date(),
    activationToken: '',
    expireTimeForModifyToken: new Date(),
  };
};
