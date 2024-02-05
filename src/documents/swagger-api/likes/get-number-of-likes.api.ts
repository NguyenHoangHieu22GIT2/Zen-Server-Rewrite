import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export function GetNumberOfLikesSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Get number of likes successfully',
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
