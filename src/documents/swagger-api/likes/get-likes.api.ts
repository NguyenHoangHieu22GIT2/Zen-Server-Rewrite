import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function GetLikesSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Get likes successfully',
    }),

    ApiResponse({
      status: 404,
      description: 'No Post Found',
    }),
    apiResponseInternalServerError,
  );
}
