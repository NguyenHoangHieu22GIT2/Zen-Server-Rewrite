import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function ChangeAvatarSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Update avatar successfully',
    }),
    ApiResponse({
      status: 401,
      description: 'No User Found',
    }),
    ApiResponse({
      status: 401,
      description: 'No User Found',
    }),
    apiResponseInternalServerError,
  );
}
