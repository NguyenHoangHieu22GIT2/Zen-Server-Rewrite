import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateEnduserDto } from './dto/create-end-user.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBody({ type: CreateEnduserDto })
  @ApiResponse({
    status: 201,
    description: 'your account has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Invalid inputs' })
  @Post()
  create(@Body() createEnduserDto: CreateEnduserDto) {
    console.log('Hello world');
    return this.authService.registerAccount(createEnduserDto);
  }
}
