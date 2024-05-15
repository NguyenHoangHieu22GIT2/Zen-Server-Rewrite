import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function AcceptFriendRequestSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Accept friend request sucessfully!',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
  );
}
