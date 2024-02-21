import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function getGroupMembersSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Let user join in sucessfully',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No User Found',
    }),
  );
}
