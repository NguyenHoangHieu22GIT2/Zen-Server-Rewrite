import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function DeclineFriendRequestSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Decline friend request sucessfully!',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
  );
}
