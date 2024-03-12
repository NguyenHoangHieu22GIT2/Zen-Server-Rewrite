import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function createEventSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Create event succesfully',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No group found!',
    }),
  );
}
