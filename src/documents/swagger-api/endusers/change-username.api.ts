import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginEndUserDto } from 'src/modules/auth/dto/login-end-user.dto';
import { ChangeUsernameDto } from 'src/modules/users/enduser/dto/change-username.dto';

export function ChangeUsernameSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiBody({ type: ChangeUsernameDto }),
    ApiResponse({
      status: 200,
      description: 'Changed successfully',
    }),
    ApiResponse({ status: 400, description: 'Invalid inputs' }),
    ApiResponse({
      status: 401,
      description: 'No User Found',
    }),
  );
}
