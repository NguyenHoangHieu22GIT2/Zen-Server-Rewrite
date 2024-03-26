import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function createGroupSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'create group successfully',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'error',
    }),
  );
}
