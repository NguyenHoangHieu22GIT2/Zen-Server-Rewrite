import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function CreateFriendRequestSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Create friend request sucessfully!',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No User Found',
    }),
  );
}
