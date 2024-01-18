import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EnduserServiceStable } from './services/enduser.stable.service';
import { SerializeDecorator } from 'src/cores/interceptors/Serialize.interceptor';
import { EndUserSerializeDto } from './dto/enduser.serialize.dto';
import { LocalGuard } from 'src/modules/auth/passport/local.guard';
import { FindByIdEndUserDto } from './dto/find-one.dto';
import { LoggedInGuard } from 'src/modules/auth/passport/loggedIn.guard';

@ApiTags('End User')
@Controller('enduser')
@SerializeDecorator(EndUserSerializeDto)
@UseGuards(LoggedInGuard)
export class EnduserController {
  constructor(private readonly enduserServiceStable: EnduserServiceStable) {}

  @Get('/:id')
  async findOne(@Param() params: FindByIdEndUserDto) {
    console.log(params);
  }
}
