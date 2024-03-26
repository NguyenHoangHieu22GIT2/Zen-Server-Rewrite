import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function modifyEventSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'modify event succesfully',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No group found!',
    }),
  );
}
