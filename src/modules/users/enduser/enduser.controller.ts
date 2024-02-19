import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { EnduserServiceStable } from './services/stable/';
import { SerializeDecorator } from 'src/cores/interceptors/';
import { EndUserSerializeDto, FindByIdEndUserDto } from './dto/';
import { LoggedInGuard } from 'src/modules/auth/passport/loggedIn.guard';
import { FindOneEndUserSwaggerAPIDecorators } from 'src/documents/swagger-api/endusers/';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangeInformationDto } from './dto/change-information.dto';
import { RequestUser } from 'src/common/types/utilTypes/RequestUser';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/';
import { EndUserId } from 'src/common/types/utilTypes/';
import { EnduserServiceUnstable } from './services/unstable/';

@ApiTags('End User')
@Controller('endusers')
@SerializeDecorator(EndUserSerializeDto)
@UseGuards(LoggedInGuard)
export class EnduserController {
  constructor(
    private readonly enduserServiceStable: EnduserServiceStable,
    private readonly enduserServiceUnstable: EnduserServiceUnstable,
  ) {}

  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  @FindOneEndUserSwaggerAPIDecorators()
  async findOne(@Param() params: FindByIdEndUserDto) {
    return this.enduserServiceUnstable.findById(params.id);
  }

  @Patch('/change-avatar')
  @UseInterceptors(FileInterceptor('file'))
  async changeAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestUser,
  ) {
    const userId = checkToConvertToMongoIdOrThrowError<EndUserId>({
      id: req.user._id,
      returnError: true,
    });
    return this.enduserServiceUnstable.changeAvatar({
      userId,
      file,
    });
  }

  @Patch('change-information')
  async changeInformation(
    @Body() changeInformationDto: ChangeInformationDto,
    @Req() req: RequestUser,
  ) {
    const userId = checkToConvertToMongoIdOrThrowError<EndUserId>({
      id: req.user._id,
      returnError: true,
    });
    return this.enduserServiceUnstable.changeInformation({
      changeInformationDto,
      userId,
    });
  }
}
