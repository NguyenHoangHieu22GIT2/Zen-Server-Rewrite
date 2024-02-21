import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function ToggleLikeSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Toggle like succesfully',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No Post Found',
    }),
  );
}
