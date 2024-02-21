import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function FindOneEndUserSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Find one end user successfully',
    }),
    ApiResponse({
      status: 401,
      description: 'No User Found',
    }),
    apiResponseInternalServerError,
  );
}
