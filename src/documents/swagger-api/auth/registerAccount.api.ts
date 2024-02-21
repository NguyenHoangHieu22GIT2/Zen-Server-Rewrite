import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
import { RegisterEndUserDto } from 'src/modules/auth/dto/register-end-user.dto';

export function RegisterAccountSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiBody({ type: RegisterEndUserDto }),
    ApiResponse({
      status: 201,
      description: 'your account has been successfully created',
    }),
    ApiResponse({ status: 400, description: 'Invalid inputs' }),
    ApiResponse({
      status: 409,
      description: 'This email is already in used. Try another one',
    }),
    apiResponseInternalServerError,
  );
}
