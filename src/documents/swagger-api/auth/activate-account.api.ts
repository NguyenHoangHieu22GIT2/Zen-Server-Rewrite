import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ActivateAccountDto } from 'src/modules/auth/dto/activate-account.dto';
import { ForgotPasswordDto } from 'src/modules/auth/dto/forgot-password.dto';
import { LoginEndUserDto } from 'src/modules/auth/dto/login-end-user.dto';

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
  );
}
