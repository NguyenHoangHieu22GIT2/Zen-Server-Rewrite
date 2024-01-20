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
import { EnduserServiceStable } from './services/enduser.stable.service';
import { SerializeDecorator } from 'src/cores/interceptors/Serialize.interceptor';
import { EndUserSerializeDto } from './dto/enduser.serialize.dto';
import { FindByIdEndUserDto } from './dto/find-one.dto';
import { LoggedInGuard } from 'src/modules/auth/passport/loggedIn.guard';
import { FindOneEndUserSwaggerAPIDecorators } from 'src/documents/swagger-api/endusers/find-one.api';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangeUsernameSwaggerAPIDecorators } from 'src/documents/swagger-api/endusers/change-username.api';
import { ChangeGenderSwaggerAPIDecorators } from 'src/documents/swagger-api/endusers/change-gender.api';
import { ChangeInformationDto } from './dto/change-information.dto';
import { Request } from 'express';
import { RequestUser } from 'src/common/types/utilTypes/RequestUser';
import { convertToMongoId } from 'src/common/utils/convertToMongodbId';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { EnduserServiceUnstable } from './services/enduser.unstable.service';

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
    return this.enduserServiceStable.findById(params.id);
  }

  @Patch('/change-avatar')
  @UseInterceptors(FileInterceptor('file'))
  async changeAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestUser,
  ) {
    const userId = convertToMongoId<EndUserId>({
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
    const userId = convertToMongoId<EndUserId>({
      id: req.user._id,
      returnError: true,
    });
    return this.enduserServiceUnstable.changeInformation({
      changeInformationDto,
      userId,
    });
  }
}
