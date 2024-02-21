import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
import { LoginEndUserDto } from 'src/modules/auth/dto/login-end-user.dto';

export function LoginAccountSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiBody({ type: LoginEndUserDto }),
    ApiResponse({
      status: 200,
      description: 'Login successfully',
    }),
    ApiResponse({ status: 400, description: 'Invalid inputs' }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized (has not activate the account)',
    }),
    apiResponseInternalServerError,
  );
}
