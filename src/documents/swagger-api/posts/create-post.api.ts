import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function CreatePostSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Create post successfully',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 401,
      description: 'Invalid Inputs',
    }),
  );
}
