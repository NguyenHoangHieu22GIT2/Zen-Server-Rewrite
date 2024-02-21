import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
export function DeleteGroupMemberSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'delete group member sucessfully',
    }),
    apiResponseInternalServerError,
    ApiResponse({
      status: 404,
      description: 'No User Found',
    }),
  );
}
