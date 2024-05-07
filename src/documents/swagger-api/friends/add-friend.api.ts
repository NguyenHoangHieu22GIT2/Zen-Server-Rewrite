import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function AddFriendSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Add friend successfully!',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No User Found',
    }),
  );
}
