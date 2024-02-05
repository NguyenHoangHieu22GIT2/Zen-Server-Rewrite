import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export function GetPostsSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Get Posts sucessfully',
    }),
    ApiResponse({
      status: 500,
      description: 'Server not responsed',
    }),
  );
}
