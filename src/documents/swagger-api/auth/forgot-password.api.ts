import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { apiResponseInternalServerError } from 'src/common/constants';
import { ForgotPasswordDto } from 'src/modules/auth/dto/forgot-password.dto';

export function ForgotPasswordSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiBody({ type: ForgotPasswordDto }),
    ApiResponse({
      status: 200,
      description: 'Sent mail to the forgot password account',
    }),
    ApiResponse({
      status: 404,
      description: 'No Account Found from this email address!',
    }),
    apiResponseInternalServerError,
  );
}
