import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export function GetLikesSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Get likes successfully',
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
