import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginEndUserDto } from 'src/modules/auth/dto/login-end-user.dto';
import { ChangeGenderDto } from 'src/modules/users/enduser/dto/change-gender.dto';

export function ChangeGenderSwaggerAPIDecorators(): MethodDecorator {
  return applyDecorators(
    ApiBody({ type: ChangeGenderDto }),
    ApiResponse({
      status: 200,
      description: 'Change gender successfully',
    }),
    ApiResponse({ status: 400, description: 'Invalid inputs' }),
    ApiResponse({
      status: 401,
      description: 'No User Found',
    }),
  );
}
