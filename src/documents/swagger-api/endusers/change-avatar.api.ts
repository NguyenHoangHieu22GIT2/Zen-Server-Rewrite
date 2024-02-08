import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export function ChangeAvatarSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Update avatar successfully',
    }),
    ApiResponse({
      status: 401,
      description: 'No User Found',
    }),
    ApiResponse({
      status: 401,
      description: 'No User Found',
    }),
  );
}
