import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function findGroupMemberSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'find group member sucessfully',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No User Found',
    }),
  );
}
