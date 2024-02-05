import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export function DeletePostsSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Delete Posts sucessfully',
    }),
    ApiResponse({
      status: 500,
      description: 'Server not responsed',
    }),
  );
}
