import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthServiceUnstable } from './unstable/auth.unstable.service';
import { RegisterEndUserDto } from './dto/register-end-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAccountSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/registerAccount.api';
import { LoginEndUserDto } from './dto/login-end-user.dto';
import { LoginAccountSwaggerAPIDecorators } from 'src/documents/swagger-api/auth/loginAccount.api';
@ApiTags('Authentication/Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authServerUnstable: AuthServiceUnstable) {}

  @RegisterAccountSwaggerAPIDecorators()
  @Post('register-account')
  registerAccount(@Body() registerEndUserDto: RegisterEndUserDto) {
    return this.authServerUnstable.registerAccount(registerEndUserDto);
  }

  @LoginAccountSwaggerAPIDecorators()
  @Patch('login-account')
  loginAccount(@Body() loginEndUserDto: LoginEndUserDto) {
    return this.authServerUnstable.loginAccount(loginEndUserDto);
  }
}
