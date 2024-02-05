import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export function ModifyPostsSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Modify Posts sucessfully',
    }),
    ApiResponse({
      status: 500,
      description: 'Server not responsed',
    }),
  );
}
