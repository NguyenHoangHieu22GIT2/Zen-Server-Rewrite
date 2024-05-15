import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function RemoveFriendSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 204,
      description: 'Remove friend sucessfully!',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No user Found!',
    }),
  );
}
