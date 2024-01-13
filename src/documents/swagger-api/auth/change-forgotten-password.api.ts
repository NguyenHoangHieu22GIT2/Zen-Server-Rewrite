import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ChangeForgottonPasswordDto } from 'src/modules/auth/dto/change-forgotton-password.dto';

export function ChangeForgottonPasswordSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiBody({ type: ChangeForgottonPasswordDto }),
    ApiResponse({
      status: 200,
      description: 'Changed password sucessfully',
    }),
    ApiResponse({
      status: 401,
      description: 'Error: Unauthorized',
    }),
  );
}
