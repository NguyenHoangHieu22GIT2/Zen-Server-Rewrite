import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
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
import { FindOneEndUserSwaggerAPIDecorators } from 'src/documents/swagger-api/endusers/find-one.api';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('End User')
@Controller('endusers')
@SerializeDecorator(EndUserSerializeDto)
@UseGuards(LoggedInGuard)
export class EnduserController {
  constructor(private readonly enduserServiceStable: EnduserServiceStable) {}

  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  @FindOneEndUserSwaggerAPIDecorators()
  async findOne(@Param() params: FindByIdEndUserDto) {
    return this.enduserServiceStable.findById(params.id);
  }

  @Patch('/change-avatar')
  @UseInterceptors(FileInterceptor('file'))
  async changeAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Body() findByIdEndUserDto: FindByIdEndUserDto,
  ) {
    return this.enduserServiceStable.changeAvatar({
      userId: findByIdEndUserDto.id,
      file,
    });
  }
}
