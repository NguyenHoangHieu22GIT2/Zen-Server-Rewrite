import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function deleteGroupSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'delete group successfully',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No Group Found',
    }),
  );
}
