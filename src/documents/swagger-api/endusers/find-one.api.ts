import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginEndUserDto } from 'src/modules/auth/dto/login-end-user.dto';

export function FindOneEndUserSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiBody({ type: LoginEndUserDto }),
    ApiResponse({
      status: 200,
      description: 'Find one end user successfully',
    }),
    ApiResponse({ status: 400, description: 'Invalid inputs' }),
    ApiResponse({
      status: 401,
      description: 'No User Found',
    }),
  );
}
