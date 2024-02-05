import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export function GetPostSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'get post successfully',
    }),
    ApiResponse({
      status: 500,
      description: 'Server not responsed',
    }),
    ApiResponse({
      status: 404,
      description: 'No Post Found',
    }),
  );
}
