import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function modifyGroupSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'modify group successfully',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No Group Found',
    }),
  );
}
