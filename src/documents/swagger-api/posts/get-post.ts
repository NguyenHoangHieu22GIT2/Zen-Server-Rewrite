import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function GetPostSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'get post successfully',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No Post Found',
    }),
  );
}
