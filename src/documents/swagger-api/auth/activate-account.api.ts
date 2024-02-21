import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
import { ActivateAccountDto } from 'src/modules/auth/dto/activate-account.dto';

export function ActivateAccountSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiBody({ type: ActivateAccountDto }),
    ApiResponse({
      status: 200,
      description: 'Activate successfully',
    }),
    ApiResponse({
      status: 401,
      description: 'Error: Unauthorized',
    }),
    apiResponseInternalServerError,
  );
}
