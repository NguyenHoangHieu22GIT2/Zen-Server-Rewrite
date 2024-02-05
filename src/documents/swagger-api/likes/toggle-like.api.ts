import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export function ToggleLikeSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Toggle like succesfully',
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
