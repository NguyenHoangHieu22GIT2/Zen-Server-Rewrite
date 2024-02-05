import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export function CreatePostSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Create post successfully',
    }),
    ApiResponse({
      status: 500,
      description: 'Server not responsed',
    }),
    ApiResponse({
      status: 401,
      description: 'Invalid Inputs',
    }),
  );
}
